# Requisitos gerais

<p style="text-align:justify;"> EnergyDrive, embora pareça ser um objeto simples, envolve uma série de considerações de eletrônica, estrutura, energia e software para garantir sua funcionalidade, durabilidade e segurança. Ao projetar o Energydrive, é fundamental estabelecer um conjunto de requisitos gerais que abrandem desde a capacidade de carga até o controle do sistema de carregamento das células. </p>


**Requisitos funcionais para o produto**

| Requisito | Nome | Descrição | Observações |
|:---------:| :--- |:---------:|:-----------:|
| RF01 | Transporte de Baterias  | O EnergyDrive deve transportar as células de baterias sem tombar. |             |
| RF02 | Rodas Adaptadas  | O EnergyDrive deve conter duas rodas que consigam trafegar por todos os tipos de terreno . |             |
| RF03 | Freios específicos  | O EnergyDrive deve ter um freio que sempre está acionado até que seja liberado empurrando e segurando uma alça ou levantando parte do carrinho, além de ser capaz de frear por completo o EnergyDrive. |             |
| RF04 | Monitoramento do Carregamento das Células  | O EnergyDrive deve ter um sistema de monitoramento de tensão e temperatura para garantir a segurança do carregamento das células. |             |
| RF05 | Controle do Sistema de Carregamento das Baterias | O EnergyDrive deve ter contorle sobre o sistema de carregamento para, em casos de emergência, desligar o sistema por completo . |             |
| RF06 | Painel de Controle | Deve haver um painel de controle para o desligamento do sistema de baterias em casos de emergência, onde também será possível monitorar o carregamento |             |


<font size="2"><p style="text-align: center">Tabela 1: Requisitos funcionais</p></font>

**Requisitos não funcionais para o produto**

| Requisito | Nome | Descrição | Observações |
|:---------:| :--- |:---------:|:-----------:|
| RNF01 | Mobilidade  |  O EnergyDrive deve ser capaz de realizar o deslocamento do pacote de baterias de forma segura e com o menor esforço possível por parte de quem o empurra, mesmo em terrenos com muita inclinação.|             |
| RNF02 | Conversores de potência e compatibilidade de carregamento | O sistema será capaz de se adaptar a diferentes tipos de baterias de veículos elétricos, utilizando conversores de potência que permitam o carregamento rápido e seguro para diferentes tensões e correntes. |             |
| RNF03 | Sistema de gerenciamento de energia | EnergyDrive será equipado com baterias de alta capacidade e um sistema inteligente de gerenciamento de energia, que distribui a carga de forma eficiente e monitora a saúde das baterias. Isso garante que o carregamento seja realizado de forma segura, prevenindo sobrecargas e otimizando o uso da energia armazenada. |  |
| RNF04 | Projeto robusto e leve | O sistema mecânico será projetado com um chassi otimizado para minimizar o peso, sem comprometer a resistência da estrutura. |             |
| RNF05 | Compartimento extra  | O EnergyDrive deve ter um compartimento extra extra para o transporte de ferramentas úteis como ferramentas e multímetros por exemplo.  |             |
| RNF06 | Fontes de energia renovável | Além de carregar baterias, o EnergyDrive pode ser equipado com fontes renováveis, como paineis solares, para auxiliar no carregamento das baterias internas do veículo durante a operação. |  |

<font size="2"><p style="text-align: center">Tabela 2: Requisitos não funcionais</p></font>



## Requisitos de Estruturas

### Requisitos Funcionais (RF)

| **Requisito** | **Nome**                           | **Descrição**                                                                                                                                                                |
|---------------|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **RF01**      | Mobilidade do Carrinho            | O carrinho deve permitir deslocamento manual, sendo empurrado com facilidade pelo operador, garantindo transporte seguro e prático das baterias em diferentes tipos de terreno. |
| **RF02**      | Capacidade de Manobra             | O carrinho deve ter boa capacidade de manobra, permitindo ajustes rápidos de direção para facilitar o transporte das baterias em áreas de acesso restrito ou terrenos irregulares. |
| **RF03**      | Sistema de Freio Automático       | O carrinho deve ter um sistema de freio automático acionado por manetes. Quando a manete é pressionada, o freio é liberado; ao soltar, o freio trava automaticamente, garantindo segurança. |

### Requisitos Não Funcionais (RNF)

| **Requisito** | **Nome**                           | **Descrição**                                                                                                                                                                |
|---------------|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **RNF01**     | Suporte à Carga dos Equipamentos  | A estrutura do carrinho deve ser robusta para suportar o peso total dos equipamentos transportados, como baterias, carregador, ferramentas e outros itens essenciais.        |
| **RNF02**     | Organização e Contenção no Envelope | O carrinho deve acomodar de forma organizada e segura todos os itens necessários para a competição, incluindo baterias, carregador, ferramentas, extintor, EPI e tela de proteção. |
| **RNF03**     | Redundância no Sistema de Freios  | O sistema de frenagem deve incluir redundância com freios independentes para cada roda traseira, garantindo maior segurança e controle em caso de falha.                     |
| **RNF04**     | Isolamento Elétrico do Carregador | Deve haver isolamento elétrico eficaz entre o carregador e o chassi do carrinho, protegendo os usuários e prevenindo descargas elétricas acidentais.                         |




## Requisitos de Eletronica 

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


## Requisitos de Software

### **Requisitos Funcionais**

| ID   | Descrição                                                                                         | Relacionado a         |
|------|---------------------------------------------------------------------------------------------------|-----------------------|
| RF01 | Permitir o cadastro, edição, exclusão e visualização de estações de carregamento.                 | FT01, US01            |
| RF02 | Exibir dados técnicos das baterias (frequência e tensão) em gráficos intuitivos.                  | FT02, US03            |
| RF03 | Permitir a exportação de dados de carregamento em formatos como PDF ou CSV.                       | US04                  |
| RF04 | Possibilitar ligar ou desligar remotamente o carregamento das baterias.                           | FT03, US05            |
| RF05 | Notificar o usuário em caso de erros no carregamento ou falhas técnicas na placa.                 | US06                  |
| RF06 | Permitir o gerenciamento de acesso de usuários (criação, edição, exclusão).                       | FT04, US07            |
| RF07 | Exigir autenticação para acessar funcionalidades do sistema.                                      | US09                  |
| RF08 | Permitir que o usuário visualize e edite informações de sua conta.                                | FT05, US10            |
| RF09 | Exibir o histórico de carregamento das estações.                                                  | FT03, US08            |

### **Requisitos Não Funcionais**

| ID   | Descrição                                                                                         | Categoria             |
|------|---------------------------------------------------------------------------------------------------|-----------------------|
| RNF01| Processar e exibir dados de carregamento com latência inferior a 3 segundos.                      | Desempenho            |
| RNF02| Suportar simultaneamente pelo menos 20 usuários acessando funcionalidades básicas.                | Desempenho            |
| RNF03| Oferecer uma interface gráfica intuitiva e acessível para usuários não técnicos.                  | Usabilidade           |
| RNF04| Exibir informações gráficas de forma clara e fácil de interpretar.                                | Usabilidade           |
| RNF05| Criptografar dados sensíveis, como credenciais de login e informações de conta (ex.: AES-256).    | Segurança             |
| RNF06| Implementar controle de acesso baseado em perfis de usuário.                                      | Segurança             |
| RNF07| Ser compatível com navegadores modernos e versões recentes (últimos dois anos).                   | Compatibilidade       |
| RNF08| Funcionar adequadamente em dispositivos móveis e desktops (design responsivo).                    | Compatibilidade       |
| RNF09| Suportar aumento de estações de carregamento e usuários simultâneos conforme a demanda.           | Escalabilidade        |
| RNF10| Fornecer documentação completa para desenvolvedores sobre APIs, fluxos e integrações.             | Manutenibilidade      |



## Tabela de versionamento

| Versão| Data | Descrição | Responsável|
|-------|------|-----------|------------|
| 1.0 | 10/04/2024 | Criação do documento | [Matheus Neubern](https://gitlab.com/Neubern) |
| 1.1 | 10/04/2024 | Criação do documento | [Erick levy](https://gitlab.com/Ericklevy) e [Matheus Neubern](https://gitlab.com/Neubern) |


