import "@mantine/core/styles.css";

import type { Metadata } from "next";
import { Archivo } from "next/font/google";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { QueryProvider } from "../components/QueryProvider";
import { StyledComponentsRegistry } from "../ui/registry";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory Assistant",
  description: "Assistant de gestion de stock",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="fr">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={archivo.className}>
        <StyledComponentsRegistry>
          <MantineProvider>
            <QueryProvider>{children}</QueryProvider>
          </MantineProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default Layout;
