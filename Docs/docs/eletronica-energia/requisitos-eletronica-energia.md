## Requisitos do Subsistema de Energia e Eletrônica

Os requisitos definidos para o subsistema de eletrônica visam assegurar uma operação eficaz, confiável e segura do carregamento, satisfazendo integralmente as demandas do projeto.

### Requisitos Funcionais (RF)

| Requisito | Nome                                  | Descrição                                                                                                               |
|-----------|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| RF01      | Monitoramento do Carregamento das Células | O EnergyDrive deve ter um sistema de monitoramento de tensão e temperatura para garantir a segurança do carregamento das células. |
| RF02      | Controle do Sistema de Carregamento das Baterias | O EnergyDrive deve ter contorle sobre o sistema de carregamento para, em casos de emergência, desligar o sistema por completo . |
| RF03      | Painel de Controle          | Deve haver um painel de controle para o desligamento do sistema de baterias em casos de emergência, onde também será possível monitorar o carregamento. |

### Requisitos Não Funcionais (RNF)

| Requisito | Nome                                  | Descrição                                                                                                               |
|-----------|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| RNF01     | Sistema de gerenciamento de energia              | O EnergyDrive será equipado com baterias de alta capacidade e um sistema inteligente de gerenciamento de energia, que distribui a carga de forma eficiente e monitora a saúde das baterias. Isso garante que o carregamento seja realizado de forma segura, prevenindo sobrecargas e otimizando o uso da energia armazenada.. |
| RNF02     | Fontes de energia renovável| Além de carregar baterias, o EnergyDrive pode ser equipado com fontes renováveis, como paineis solares, para auxiliar no carregamento das baterias internas do veículo durante a operação. |
| RNF03     | Conversores de potência e compatibilidade de carregamento                    | O sistema será capaz de se adaptar a diferentes tipos de baterias de veículos elétricos, utilizando conversores de potência que permitam o carregamento rápido e seguro para diferentes tensões e correntes.|
| RNF04    | Compatibilidade com Protocolos de Comunicação | O sistema deve fazer uma comunicação enviando os dados de maneira compatível para o software. |

### Versionamento

| Versão | Data       | Descrição                                              | Responsável   |
|--------|------------|--------------------------------------------------------|---------------|
| 0.1    | 03/12/2024 | Adição dos requisitos.                        | [Matheus Neubern](https://gitlab.com/Neubern)    |
