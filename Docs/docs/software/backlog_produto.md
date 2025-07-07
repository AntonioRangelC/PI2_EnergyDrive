# Backlog do Produto

O backlog do produto é uma lista organizada e detalhada de todas as funcionalidades, requisitos e melhorias que são necessários ou desejados para um produto. Ele é essencial para o desenvolvimento ágil, como no Scrum, e é utilizado para guiar a equipe sobre o que deve ser feito para criar ou aprimorar o produto.

## Abreviação e seu significado

| Abreviação | Significado                          |
| ---------- | ------------------------------------ |
| US         | User Stories (Histórias de Usuários) |
| EP         | Épicos                               |
| FT         | Features (Funcionalidades)           |

## Termo importante que sera utilizado nesse documento

| Termo        | Definição                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------ |
| User Stories | User Stories são exemplos de usuários que irão utilizar a função de uma feature em questão |
| Epics        | Epics são descrições gerais do que se deseja no software                                   |
| Features     | Features são semelhantes a Epics, porém são mais detalhadas em relação ao que é função     |

## Priorização com MoSCoW

A priorização MoSCoW é uma técnica popular para organizar e definir prioridades de requisitos e tarefas em projetos, especialmente em desenvolvimento ágil. MoSCoW é um acrônimo que ajuda a classificar os itens do backlog ou requisitos de um produto com base em quatro categorias. As classificações são dadas por Must, Should, Could e Won't, que juntas formam o acrônimo MoSCoW.

| Priorização          | explicação                                                                                                                                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Must (Deve ter)      | São os requisitos essenciais e indispensáveis para que o produto ou projeto seja considerado funcional e atenda aos objetivos mínimos. Sem esses itens, o projeto não alcança seu propósito.                               |
| Should (Deveria ter) | Requisitos importantes, mas não críticos. Eles agregam valor significativo ao produto, mas sua ausência não inviabiliza o projeto. Em caso de limitação de tempo ou recursos, eles podem ser temporariamente adiados.      |
| Could (Poderia ter)  | Requisitos que trazem valor adicional, mas são menos prioritários. São "desejáveis" e implementados apenas se houver tempo e recursos suficientes, sem prejudicar o desenvolvimento dos itens "Must Have" e "Should Have". |
| Won't (Não terá)     | São itens que foram considerados, mas decididos para não serem incluídos no momento. Podem ser deixados de fora porque não são viáveis ou necessários neste ciclo do projeto, mas podem ser reavaliados futuramente.       |

## Épicos - Aplicação Web Responsiva

Épicos no backlog do produto representam grandes iniciativas ou metas de alto nível que são desmembradas em tarefas menores. Eles são usados para agrupar um conjunto de funcionalidades ou requisitos que, juntos, contribuem significativamente para o desenvolvimento de um produto.

| ID   | Épico                                      |
| ---- | ------------------------------------------ |
| EP01 | Gerenciamento de carregamento das baterias |
| EP02 | Gerenciamento de usuários                  |

## Funcionalidades - Aplicação Web Responsiva

| ID   | Funcionalidade                         | ID do Épico |
| ---- | -------------------------------------- | ----------- |
| FT01 | Gerenciamento estações de carregamento | EP01        |
| FT02 | Visualização de Dados do carregamento  | EP01        |
| FT03 | Controle do carregamento da bateria    | EP01        |
| FT04 | Gerenciamento de Acesso da aplicação   | EP02        |
| FT05 | Gerenciamento de Conta do usuário      | EP02        |

## Story map

![Story Map](../assets/software/storymap.png#zoom)

## User Stories - Aplicação Web Responsiva

| ID   | User Story                                                                           | Prioridade | Da Funcionalidade |
| ---- | ------------------------------------------------------------------------------------ | ---------- | ----------------- |
| US01 | Eu, como usuário, desejo gerenciar as estações de carregamento                       | Should     | FT01              |
| US02 | Eu, como usuário, gostaria que a aplicação trouxesse dados da bateria vindo da placa | Must       | FT02              |
| US03 | Eu, como usuário, desejo visualizar dados da bateria de forma gráfica                | Must       | FT02              |
| US04 | Eu, como usuário, desejo exportar os dados da bateria para um documento              | Must       | FT02              |
| US05 | Eu, como usuário, desejo desligar ou ligar a placa através de um botão               | Must       | FT03              |
| US06 | Eu, como usuário, gostaria de ser notificado quando houver algum erro na placa       | Should     | FT03              |
| US07 | Eu, como usuário, gostaria de gerenciar o acesso à aplicação                         | Could      | FT04              |
| US08 | Eu, como usuário, gostaria de visualizar o histórico de carregamento da estação      | Could      | FT03              |
| US09 | Eu, como usuário, desejo autenticar-me na aplicação                                  | Could      | FT04              |
| US10 | Eu, como usuário, desejo gerenciar minha conta                                       | Could      | FT05              |

### Critérios de aceitação - Aplicação Web Responsiva

| ID da História | Critério de aceitação                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| US01           | Deve haver uma opção de cadastrar uma estação de carregamento                                           |
| US01           | Deve existir uma opção para excluir estações cadastradas                                                |
| US01           | Deve haver uma opção para visualizar os dados da estação                                                |
| US01           | Deve existir uma opção para editar estações de carregamento                                             |
| US02           | O sistema deve fazer a conexão com a placa                                                              |
| US02           | O sistema deve salvar os dados da bateria no banco de dados                                             |
| US03           | Os dados mostrados devem ser oriundos da placa                                                          |
| US03           | Deve haver mapas de calor com os dados de temperatura                                                   |
| US03           | Deve haver uma forma gráfica de mostrar cada célula e seus dados de temperatura e tensão                |
| US03           | Deve haver uma forma de adicionar placas BMS                                                            |
| US03           | Deve haver uma forma de editar as placas BMS, para colocar/remover células                              |
| US03           | Deve haver uma forma de remover a placa BMS                                                             |
| US03           | Uma placa BMS deve possuir de 1 a 16 células                                                            |
| US03           | A numeração de cada célula deve ser feita de forma crescente, do 1 ao 21                                |
| US04           | Conseguir exportar para documento (csv) os dados da bateria                                             |
| US04           | Conseguir exportar para documento (pdf) os dados da bateria                                             |
| US05           | O sistema deve ligar/desligar a placa a qualquer momento ao pressionar o botão no front                 |
| US05           | Antes de ligar / desligar o carregamento, o sistema deve verificar se existe algum erro                 |
| US06           | Notificar usuário através do telegram ao receber erros da placa                                         |
| US06           | Em caso de identificação de erro, deve desligar o carregamento automaticamente                          |
| US07           | Deve ter dois níveis de acesso: admin e somente visualização                                            |
| US07           | O admin deve ter a opção de excluir a conta de um usuário                                               |
| US08           | Os carregamentos devem estar separados por data e hora                                                  |
| US08           | Deve ser mostrado um gráfico de linha / barra mostrando horários e porcentagem da bateria               |
| US08           | Exportar para documento histórico de carregamento                                                       |
| US09           | Deve existir um formulário de login, permitindo que o usuário insira suas credenciais                   |
| US09           | O sistema deve autenticar o usuário com sucesso quando as credenciais forem válidas                     |
| US09           | A sessão deve ser mantida ativa até que o usuário faça logout ou a expiração da sessão                  |
| US09           | Deve existir uma opção de logout, para que o usuário encerre a sessão com sua conta                     |
| US10           | O usuário deve ser capaz de criar uma conta na plataforma.                                              |
| US10           | Se as credenciais fornecidas forem inválidas, o sistema deve exibir uma mensagem de erro apropriada     |
| US10           | O usuário deve poder editar informações básicas da conta, como nome, endereço de e-mail, senha, etc.    |
| US10           | Antes de aplicar as alterações definitivamente, o sistema deve solicitar a confirmação do usuário       |
| US10           | O usuário deve poder excluir a própria conta                                                            |
| US10           | Ao tentar excluir a própria conta, o sistema deve perguntar se o usuário tem certeza que deseja excluir |

## Roadmap

<table>
  <tr>
    <th>Fase</th>
    <th>Atividade</th>
    <th>Data</th>
  </tr>
  <tr>
    <td rowspan="3"><strong>Fase 1: Planejamento e Análise de Requisitos</strong></td>
    <td>Levantamento de requisitos</td>
    <td>01/11/24 - 07/11/24</td>
  </tr>
  <tr>
    <td>Análise de viabilidade técnica</td>
    <td>08/11/24 - 14/11/24</td>
  </tr>
  <tr>
    <td>Definição do escopo do projeto</td>
    <td>15/11/24 - 21/11/24</td>
  </tr>
  <tr>
    <td><strong>Fase 2: Design e Arquitetura</strong></td>
    <td>Design da interface do usuário (UI)</td>
    <td>22/11/24 - 28/11/24</td>
  </tr>
  <tr>
    <td rowspan="4"><strong>Fase 3: Desenvolvimento</strong></td>
    <td>Implementação do envio de dados de frequência e tensão - SPRINT 3</td>
    <td>02/12/24 - 15/12/24</td>
  </tr>
  <tr>
    <td>Desenvolvimento da funcionalidade de ligar/desligar o sistema remotamente - SPRINT 4</td>
    <td>16/12/24 - 13/01/25</td>
  </tr>
  <tr>
    <td>Implementação de notificações e gerenciamento de estações - SPRINT 5</td>
    <td>13/01/25 - 26/01/25</td>
  </tr>
  <tr>
    <td>Desenvolvimento de histórico de carregamento e autenticação - SPRINT 6</td>
    <td>26/01/25 - 06/02/25</td>
  </tr>
  <tr>
    <td rowspan="2"><strong>Fase 4: Testes e Validação</strong></td>
    <td>Testes unitários e de integração</td>
    <td>01/02/25 - 07/02/25</td>
  </tr>
  <tr>
    <td>Testes de sistema e aceitação do usuário</td>
    <td>01/02/25 - 07/02/25</td>
  </tr>
  <tr>
    <td rowspan="2"><strong>Fase 5: Implantação e Entrega</strong></td>
    <td>Preparação do ambiente de produção</td>
    <td>07/02/25 - 19/02/25</td>
  </tr>
  <tr>
    <td>Entrega final e documentação</td>
    <td>28/02/25 - 05/03/25</td>
  </tr>
  <tr>
    <td rowspan="3"><strong>Marcos Importantes</strong></td>
    <td>Entrega do relatório do Ponto de Controle 01</td>
    <td>25/11/24</td>
  </tr>
  <tr>
    <td>Entrega do relatório do Ponto de Controle 02</td>
    <td>13/01/25</td>
  </tr>
  <tr>
    <td>Entrega da documentação final do projeto</td>
    <td>19/02/25</td>
  </tr>
</table>

## Referências

- PEREIRA, P.; TORREÃO, P.; MARÇAL, A. S. Entendendo Scrum para gerenciar projetos de forma ágil. Mundo PM, v. 1, p. 3-11, 2007.

## Tabela de versionamento

| Versão | Data       | Descrição            | Responsável                                                                                         |
| ------ | ---------- | -------------------- | --------------------------------------------------------------------------------------------------- |
| 1.0    | 11/11/2024 | Criação do documento | [Antonio Rangel](https://gitlab.com/antonio.rangel.02) e [Erick levy](https://gitlab.com/Ericklevy) |
| 1.1    | 02/12/2024 | Ajuste de documento  | [Vitor Diniz](https://gitlab.com/vitordiniz25)                                                      |
