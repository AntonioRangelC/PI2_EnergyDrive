# **Arquitetura Geral da Solução - EnergyDrive**

## Introdução
O projeto EnergyDrive é uma solução inovadora destinada ao desenvolvimento de um veículo de transporte e carregamento de baterias, voltado para atender às exigências da equipe de Fórmula Elétrico da UnB para a competição Fórmula SAE Brasil. O objetivo é criar um "Accumulator Hand Cart" que transporte e carregue pacotes de baterias, assegurando a segurança, monitoramento e eficiência no carregamento, com foco em normas rigorosas de isolamento galvânico, controle de temperatura, e características de corrente e tensão.

## Definição do Produto
O EnergyDrive é composto por diversos componentes interligados, incluindo a estrutura mecânica do carrinho, sistemas eletrônicos de carregamento e monitoramento, e uma interface de controle remoto para o gerenciamento das baterias. A solução busca garantir segurança, eficiência e mobilidade, respeitando as especificações de segurança da competição e proporcionando a possibilidade de monitoramento remoto das condições das baterias.

## Arquitetura Geral da Solução
A arquitetura do EnergyDrive é composta por três componentes principais:

### Estrutura Mecânica
- **Função**: Garantir a movimentação segura e eficiente do carrinho de carregamento de baterias, incluindo a capacidade de suportar terrenos inclinados e realizar o transporte de forma prática.
- **Design**: Chassi otimizado para leveza e resistência, com sistema de frenagem para garantir segurança durante o transporte. O carrinho possui também um compartimento para o transporte de ferramentas úteis.

### Sistema de Energia e Eletrônica
- **Função**: Gerenciar o carregamento das baterias de forma eficiente, utilizando fontes de energia renováveis e sistemas de controle de carga e telemetria.
- **Design**: O sistema inclui baterias de alta capacidade, conversores de potência para adaptação a diferentes tipos de baterias e painéis solares para fornecer energia auxiliar. O sistema de gerenciamento de energia também assegura o carregamento seguro e eficiente, com recursos para monitoramento remoto do estado das baterias.

### Software e Controle
- **Função**: Monitorar o estado das baterias e controlar o carregamento por meio de um sistema embarcado.
- **Design**: O sistema de software embarcado permite a previsão de necessidades de energia, monitoramento em tempo real do estado de carga das baterias, controle remoto das operações de carregamento e geração de alertas sobre níveis críticos de carga. Um aplicativo de monitoramento também será desenvolvido para gerenciamento remoto em caso de falhas ou necessidade de intervenção.

## Considerações de Sustentabilidade
- **Fontes Renováveis**: Utilização de painéis solares para complementar o carregamento das baterias durante a operação.
- **Eficiência Energética**: Sistema de carregamento eficiente para garantir o uso mínimo de energia durante a operação.
- **Design Modular**: A estrutura do carrinho e seus componentes foram projetados para facilitar a manutenção e possíveis upgrades, promovendo a longevidade do equipamento.
- **Reciclagem**: Iniciativa para garantir que os componentes eletrônicos e baterias sejam recicláveis ao final da vida útil.

## Conclusão
A arquitetura do EnergyDrive visa criar uma solução robusta e eficiente para a equipe de Fórmula Elétrico da UnB, alinhando a segurança, mobilidade e sustentabilidade. A integração dos sistemas mecânicos, eletrônicos e de software proporciona um gerenciamento eficaz das baterias e garante a realização das operações de carregamento de forma segura e eficiente.

O detalhamento das arquiteturas específicas podem ser encontrados nos documentos abaixo:

1. [Estrutura](../estruturas/arquitetura.md);
2. [Eletrônica e Energia](../eletronica-energia/Arquitetura_Eletronica_Energia.md);
4. [Software](../software/arquitetura.md);

## Tabela de versionamento

| Versão| Data | Descrição | Responsável|
|-------|------|-----------|------------|
| 1.0 | 03/12/2024 | Criação do documento de arquitetura geral | [Erick levy](https://gitlab.com/Ericklevy)|
|1.1| 12/01/2025 | atualização do texto | [Erick levy](https://gitlab.com/Ericklevy)  e [Rodrigo Carvalho](https://gitlab.com/RocSantos) |   
