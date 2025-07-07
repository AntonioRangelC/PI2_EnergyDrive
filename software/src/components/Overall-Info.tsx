"use client"
import { Card, CardContent } from "@/components/ui/card"

export function OverallInfo() {
  return (
    <section className="mb-8">
        <h2 className="text-xl text-[#0B4E65] mb-4 font-semibold">Observações gerais</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[#0B4E65] text-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">16</div>
              <div className="text-sm">Carregamentos durante a semana</div>
            </CardContent>
          </Card>

          <Card className="bg-[#0B4E65] text-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">4</div>
              <div className="text-sm">Erros na semana</div>
            </CardContent>
          </Card>

          <Card className="bg-[#0B4E65] text-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">XX</div>
              <div className="text-sm">Lorem ipsum has been the in...</div>
            </CardContent>
          </Card>

          <Card className="bg-[#0B4E65] text-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">XX</div>
              <div className="text-sm">Lorem ipsum has been the in...</div>
            </CardContent>
          </Card>
        </div>
    </section>
  );
}