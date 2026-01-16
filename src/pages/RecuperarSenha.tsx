import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const RecuperarSenha = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Informe seu e-mail.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simula envio de email
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">AdminPro</h1>
          <p className="mt-2 text-muted-foreground">
            Recuperação de senha
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                E-mail enviado!
              </h2>
              <p className="mt-2 text-muted-foreground">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
              <Link to="/login">
                <Button className="mt-6 w-full">
                  Voltar para o login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Informe seu e-mail cadastrado e enviaremos instruções para redefinir sua senha.
              </p>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  autoComplete="email"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="h-11 w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Enviando...
                  </span>
                ) : (
                  "Enviar instruções"
                )}
              </Button>

              {/* Back to Login */}
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para o login
              </Link>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          © 2024 AdminPro. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default RecuperarSenha;
