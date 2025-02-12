"use client";

import { createCategory } from "@/actions/category";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { MarkdownViewer } from "./markdown-viewer";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

export interface ArticleCategory {
  value: string;
  label: string;
  articleCount: number;
}

interface ArticleEditorProps {
  defaultValue: string;
  defaultCategoryId?: number;
  existSlugs: string[];
  categories: ArticleCategory[];
}

export function ArticleEditor({
  defaultValue,
  defaultCategoryId,
  existSlugs,
  categories: existCategories,
}: ArticleEditorProps) {
  const [content, setContent] = useState(defaultValue);
  const [preview, setPreview] = useState(false);
  const isMobile = useIsMobile();
  const [categoryComboboxOpen, setCategoryComboboxOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    defaultCategoryId ? defaultCategoryId + "" : "",
  );
  const [categorySearchInput, setCategorySearchInput] = useState("");
  const [categories, setCategories] =
    useState<ArticleCategory[]>(existCategories);

  useEffect(() => {
    if (!isMobile) setPreview(false);
  }, [isMobile]);

  const handleClickCreateCategory = async () => {
    const formData = new FormData();
    formData.append("name", categorySearchInput);
    const created = await createCategory(formData);
    setCategories((prev) => [
      ...prev,
      { value: created.id + "", label: created.name, articleCount: 0 },
    ]);
    setSelectedCategory(created.id + "");
    setCategoryComboboxOpen(false);
  };

  const categoriesSorted = categories.sort(
    (a, b) => b.articleCount - a.articleCount,
  );

  return (
    <>
      <div className="fixed bottom-4 left-4 z-10 md:hidden">
        <Button onClick={() => setPreview(!preview)} type="button">
          {preview ? <Pencil /> : <Eye />}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {preview ? (
          <MarkdownViewer
            content={content || "入力してください"}
            existSlugs={existSlugs}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div>
                <Label>カテゴリー</Label>
                <input
                  type="hidden"
                  name="categoryId"
                  value={selectedCategory}
                />
                <Popover
                  open={categoryComboboxOpen}
                  onOpenChange={setCategoryComboboxOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={categoryComboboxOpen}
                      className="ml-2"
                    >
                      {selectedCategory
                        ? categories.find((d) => d.value === selectedCategory)
                            ?.label
                        : "選択してください"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="カテゴリーを検索"
                        className="h-9"
                        value={categorySearchInput}
                        onValueChange={setCategorySearchInput}
                      />
                      <CommandList>
                        <CommandEmpty className="flex flex-col space-y-4 p-4">
                          <div className="text-sm">
                            カテゴリーが見つかりません
                          </div>
                          <Button
                            className="mt-2 block max-w-full overflow-hidden text-ellipsis"
                            onClick={handleClickCreateCategory}
                            type="button"
                            size={"sm"}
                          >
                            {categorySearchInput} を作成
                          </Button>
                        </CommandEmpty>
                        <CommandGroup>
                          {categoriesSorted.map((category) => (
                            <CommandItem
                              key={category.value}
                              value={category.value}
                              keywords={[category.label]}
                              onSelect={(currentValue) => {
                                setSelectedCategory(
                                  currentValue === selectedCategory
                                    ? ""
                                    : currentValue,
                                );
                                setCategoryComboboxOpen(false);
                              }}
                            >
                              {category.label}
                              <span className="ml-auto text-right text-xs">
                                ({category.articleCount})
                              </span>
                              <Check
                                className={cn(
                                  selectedCategory === category.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Textarea
              placeholder="入力してください"
              className="h-[calc(100svh-120px)] font-mono"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        )}
        <div className="hidden overflow-y-auto md:block">
          <MarkdownViewer
            content={content || "入力してください"}
            existSlugs={existSlugs}
          />
        </div>
      </div>
    </>
  );
}
