import { CircleUser, Github, Linkedin, Mail, GlassesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { withBase } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-400">
                <GlassesIcon className="h-5 w-5 text-black" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text text-transparent">
                Poski
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Blog personal, notas y proyectos.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/Oscar-Poski/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/oscar-poski/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
                            <a
                href="https://oscar-poski.github.io/poski/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <CircleUser className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
          
        {/* Bottom */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Oscar Rivera Sánchez. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
