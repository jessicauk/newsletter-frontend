import { AppBar, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

interface Route {
  title: string;
  href: string;
}

const navItems: Route[] = [
  { title: "Home", href: "/" },
  { title: "Recipients", href: "/recipient" },
];

export default function Header() {
  return (
    <AppBar className="bg-indigo-500" component="nav" position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Newsletter App
        </Typography>
        <Box>
          {navItems?.map((item) => (
            <Button key={item.title} sx={{ color: "#fff" }}>
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
