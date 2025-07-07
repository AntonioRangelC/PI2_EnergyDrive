"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, type MouseEvent } from "react"
import { axiosInstance } from "../app/utils/axios_config"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { showComponentIfIsAuthenticated } from "@/app/utils/auth"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function Navbar() {
  const router = useRouter()
  const [nome, setNome] = useState("")
  const [cargo, setCargo] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        if (token) {
          const decodedUser = jwtDecode(token);

          const userData = await fetchUser(decodedUser.sub);

          setNome(userData.usuario.nome);
          setCargo(userData.usuario.cargo);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchData();
  }, []);

  const fetchUser = async (userId: string | undefined) => {
    try {
      const response = await axiosInstance.get(
        `/pages/api/usuario?id=${userId}`
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Erro ao buscar usuário por id");
    }
  };

  function getFirstName(name: string) {
    var dividedName = name.split(" ");
    if (dividedName[0].length > 10) {
      return "";
    } else {
      return dividedName[0];
    }
  }

  const userLogOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      localStorage.clear();
      router.push("/pages/login");
    } catch (error) {
      console.log(error);
    }
  };

  const NavLinks = () => (
      <>
        <Link href="/pages/ChargingHistory" className="hover:text-white/80 transition-colors">
          Histórico de Carregamentos
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:opacity-90">
            <span className="hover:text-white/80 transition-colors">Dashboards</span>
            <ChevronDown className="h-4 w-4 text-white/80" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/pages/cellsDashboard">Monitoramento</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pages/charts">Gráficos</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {cargo === "ADMIN" && (
            <Link href="/pages/allUsers" className="hover:text-white/80 transition-colors">
              Gestão de usuários
            </Link>
        )}
      </>
  )

  return (
      <nav className="bg-[#0B4E65] text-white p-3 w-full top-0">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className={"flex"}>
            <div className="flex items-center text-xl font-semibold">EnergyDrive</div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6"/>
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                
                <nav className="flex flex-col gap-4">
                  <>
                    <SheetClose asChild>
                      <Link href="/pages/ChargingHistory" className="hover:text-white/80 transition-colors">
                        Histórico de Carregamentos
                      </Link>
                    </SheetClose>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1 hover:opacity-90">
                        <span className="hover:text-white/80 transition-colors">Dashboards</span>
                        <ChevronDown className="h-4 w-4 text-white/80" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <SheetClose asChild>
                            <Link href="/pages/cellsDashboard">Monitoramento</Link>
                          </SheetClose>
                          
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <SheetClose asChild>
                            <Link href="/pages/charts">Gráficos</Link>
                          </SheetClose>
                          
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {cargo === "ADMIN" && (
                      <SheetClose asChild>
                        <Link href="/pages/allUsers" className="hover:text-white/80 transition-colors">
                          Gestão de usuários
                        </Link>
                      </SheetClose>
                      
                    )}
                  </>
                </nav>
                
                
              </SheetContent>
            </Sheet>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex gap-6">
            <NavLinks/>
          </div>


          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 hover:opacity-90">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg"/>
                <AvatarFallback>FT</AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start text-sm">
                <span className="font-medium">{getFirstName(nome || "")}</span>
                <span className="text-xs text-white/80">{cargo === "ADMIN" ? "Administrador" : "Somente ver"}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-white/80"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem asChild>
                <Link href="/pages/profile">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              {cargo === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link href="/pages/register">Cadastrar usuário</Link>
                  </DropdownMenuItem>
              )}
              <DropdownMenuSeparator/>
                <a onClick={userLogOut}>
                  <DropdownMenuItem>
                    Sair
                  </DropdownMenuItem>
                </a>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
  );
}

export default showComponentIfIsAuthenticated(Navbar);
