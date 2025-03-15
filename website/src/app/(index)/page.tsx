import { Button } from "@mui/material";

import { createClient } from "@/utils/supabase/server";

export default async function IndexPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>Index Page</h1>
      <p>Welcome to the Index Page!</p>
      <p>{user?.email}</p>
      <p>This is an additional paragraph providing more information.</p>
      <div>
        <Button variant="contained" color="primary">
          Click Me!
        </Button>
      </div>
    </div>
  );
}
