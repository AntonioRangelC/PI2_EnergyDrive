# Documento de Visão

## 1. Introdução

<p style="text-align: justify;"> Anualmente ocorre a competição Fórmula SAE Brasil, o objetivo desta é o de proporcionar uma ambiente de aprendizado para futuros engenheiros, tal competição possui seu modelo para carros a combustão e carros elétricos. Dentre os requisitos para se ter uma boa pontuação dentro da competição está o de ser aprovado em inspeções técnicas que levam em conta aspectos mecânicos e elétricos do carro, para que isso ocorra é necessário que as equipes atendam todos os pontos de seguranças exigidos nas regras da competição.</p>

<p style="text-align: justify;">  Diante de tal condição a equipe de fórmula elétrico da UnB necessita a construção de uma carro de carregamento e transporte para o acumulador de baterias, tal carro necessita fornecer os dados do estado das baterias para garantir um carregamento de maneira segura, deve garantir a segurança mecânica do acumulador, e garantir isolação galvânica para o usuário que irá manejar tal equipamento. </p>

<p style="text-align: justify;"> Portanto o grupo 10 propõe a criação do EnergyDrive, um carrinho de mão acumulador que respeite as normas da competição da FSAE, a fim de resolver o problema da FGR. </p> 

## 2. Definição do Produto

<p style="text-align: justify;"> O EnergyDrive deve ser capaz de realizar o transporte de um pacote de baterias de forma adequada e segura, tanto eletricamente, quanto mecanicamente. Além do transporte, o carrinho deve ser capaz de realizar o carregamento do pacote de baterias de forma adequada, respeitando requisitos de isolação galvânica entre o carrinho e as baterias e também características nominais de corrente, tensão e temperatura. Por fim, o EnergyDrive deve fornecer uma telemetria robusta e segura, a fim de garantir um gerenciamento por parte do usuário que garanta uma operação do carregamento dentro da faixa de segurança exigida das baterias. </p>

### 2.1. Perspectiva do Produto

<p style="text-align: justify;"> O foco central do projeto é ajudar a FGR na competição da FSAE, assim desenvolvendo o EnergyDrive dentro das normas da competição e assegurar que as células de baterias estejam carregando e sendo transportadas de maneira segura. </p>

### 2.2. Resumo dos Recursos

<p style="text-align: justify;"> Os recursos do EnergyDrive foram pensados para garantir o transporte das células de bateria, o carregamento seguro das celulas a partir do monitoramento de tensão e temperatura das células, além da possibilidade desse monitoramento ser remoto. Para isso, destacam-se quatro componentes essenciais da solução:  </p>

* **Mobilidade:** O EnergyDrive deve ser capaz de se deslocar com o pacote de baterias de maneira segura e com o menor esforço possível para o usuário, mesmo em terrenos com muita inclinação e adversidades. Além de possuir um sistema de frenagem de segurança.

* **Monitoramento e Controle:** O EnergyDrive deverá ter um sistema de software embarcado que permita o monitoramento da carga, previsão de necessidades energéticas e controle remoto das operações de carregamento.

* **Segurança e confiabilidade:**  O EnergyDrive deve ter um sistema de segurança que evita sobrecargas e garanta uma operação estável. Além de um compartimento específico para alocação de um extintor próprio para células de lítio. 

* **Visualização remota dos dados:** O EnergyDrive deverá ter um sistema de software capaz de receber os dados do carregamento, armazenar, alertar em caso de emergência e desligar o sistema de recarga remotamente.

## 3. Restrições

<p style="text-align: justify;"> As restrições do EnergyDrive que podem ser críticas afetando diretamente a eficácia e utilidade do equipamento. Sendo elas: </p>

### 3.1. Restrições de Implementação

<p style="text-align: justify;"> Considerando as restrições de implementação para o produto, podemos identificar várias áreas que podem influenciar seu desenvolvimento e produção: </p>

* **Recursos financeiros:** Em vista o custo elevado dos módulos que monitoram as células (BQ75616-Q1), do controlador LAUNCHXL2-TMS57012 e do carregador Longrun Lifepo4. Podem ter limites de orçamento para as outras aréas, em vista do central do projeto ser o monitoramento do carregamento das baterias.

* **Programação do sistema embarcado:** O sistema de controle e monitoramento dos módulos BMS é de alta complexidade em vista da dificuldade que é manter o carregamento de 21 células de baterias em série.

* **Materiais:** O sistema mecânico será projetado com um chassi otimizado para minimizar o peso, sem comprometer a resistência da estrutura.

* **Prazos:** O tempo limite da matéria em decorrer a um semestre reduzido em virtude a greve dos professores e a complexidade do projeto.

### 3.2. Restrições de Uso

<p style="text-align: justify;"> Em relação às principais restrições de uso do produto, podem ser observadas: </p>

* **Manuseio sem destravar o freio:** Ficar forçando o EnergyDrive a de deslocar com o freio acionado pode desgastar as rodas e destruir o sistema de freios.

* **Peso fora do padrão estabelecido:** Tentativas de transportar outros objetos além do carregador e das células no EnergyDrive, como uma pessoa, pode resultar em um compromentimento crítico da estrutura do carrinho com possível ruptura total ou parcial do material.

* **Tipo de baterias diferentes:** A restrição está relacionada com o carregador utilizado (Longrun Lifepo4), em caso de uso de outro tipo de bateria diferente da restringida pelo carregador, o carregamento nao será realizado. 

* **Não é aprova d'água:** É essencial que o usuário não exponha o EnergyDrive à água, para não comprometer o sistema de controle do carregamento e as próprias baterias. 

## 4. Identificação de solução comerciais

<p style="text-align: justify;">Após uma análise detalhada dos tópicos 1, 2 e 3, conclui-se que não existe uma solução comercial disponível que atenda especificamente às necessidades das equipes de competição da Fórmula SAE. O EnergyDrive foi pensado e desenvolvido para preencher essa lacuna, oferecendo uma solução personalizada que garante o transporte seguro e o carregamento eficiente das células de bateria, conforme as normas da competição. Este projeto visa proporcionar às equipes uma ferramenta que não só atende aos requisitos técnicos e de segurança, mas também facilita o gerenciamento e monitoramento das baterias, algo essencial para o sucesso na Fórmula SAE.</p>

## 5. Objetivo geral do projeto

<p style="text-align: justify;"> O objetivo do projeto é realizar a construção de um carrinho de mão acumulador (“EnergyDrive”) que respeite as normas da competição da FSAE. O EnergyDrive deverá ser uma maneira segura de transportar e carregar as células de bateria, monitorando tensão e temperatura, presencialmente e remotamente, e em caso de emergência, parar por completo a recarga.</p>

## 6. Objetivo específicos do projeto

-  **Criação de Protótipo Funcional:** Desenvolver um protótipo funcional que esteja nas normas da competição de FSAE e que atenda o propósito da equipe FGR.

- **Definição da Arquitetura dos Sistemas**: Estabelecer uma arquitetura de software robusta e escalável para o sistema ScanPoint, que permita uma integração eficiente de todos os módulos e componentes. Isso inclui a definição de interfaces de comunicação entre os diferentes subsistemas e a escolha das tecnologias adequadas para implementação.

- **Desenvolvimento do Sistema de Controle**: Implementar o sistema de controle para administrar o carregamento através do monitoramento de tensão e temperatura das células, podendo desligar por completo em caso de emergência.

- **Comunicação entre sistemas eletrônicos e software**: Transimitir os dados do sistema de BMS (Battery Management System) com o software desenvolvido, a fim de analisar e processar a tensão e a temperatura e conseguir realizar o monitoramento de maneira remota.

- **Validação do Sistema**: Submeter o sistema do EnergyDrive a testes de validação para garantir que ele atenda aos objetivos e requisitos estabelecidos. Isso incluirá a verificação do sistema de controle, validação do software e teste do carregamento completo de células.

- **Documentação**: Preparar documentação detalhada sobre o funcionamento e operação do EnergyDrive bem como materiais de treinamento para usuários e técnicos. Isso garantirá que os usuários estejam devidamente capacitados para utilizar o sistema de forma eficaz e segura.

## 7. Posicionamento

### 7.1. Oportunidade de Negócio

<p style="text-align: justify;"> O EnergyDrive é uma solução inovadora para o transporte e carregamento seguro de pacotes de baterias, especialmente desenvolvida para atender às necessidades das equipes de competição da Fórmula SAE. Nosso objetivo é oferecer uma ferramenta que não só garante a segurança e eficiência no manuseio das baterias, mas também facilita o gerenciamento e monitoramento remoto, proporcionando uma vantagem competitiva significativa. </p>

### 7.2. Instrução de Posição do Produto

* **Para:** Equipes de competição da Fórmula SAE
* **Que:** Necessitam de uma solução segura e eficiente para o transporte e carregamento de pacotes de baterias
* **O EnergyDrive:** É um carrinho de mão acumulador
* **Que:** Permite o transporte seguro e o carregamento eficiente das baterias, com monitoramento de tensão e temperatura
* **Diferente de:** Soluções comerciais genéricas que não atendem às normas específicas da competição
* **Nosso produto:** Oferece uma interface amigável para monitoramento remoto, garantindo segurança e conformidade com as regras da competição, além de ser uma solução personalizada para as necessidades das equipes.

### 7.3. Ambiente do Usuário

<p style="text-align: justify;"> O EnergyDrive será utilizado principalmente em ambientes de competição e oficinas de equipes da Fórmula SAE. O sistema de monitoramento e controle pode ser acessado localmente ou remotamente, permitindo que os usuários acompanhem o estado das baterias e realizem ajustes conforme necessário. A interface do sistema é projetada para ser intuitiva e fácil de usar, mesmo em condições de alta pressão durante as competições. </p>

## 8. Viabilidade de Mercado

O EnergyDrive apresenta diversas características que o tornam viável no mercado:

* **Simplicidade de Uso:** O EnergyDrive é projetado para ser intuitivo e fácil de usar, mesmo em condições de alta pressão durante as competições. A interface amigável do sistema de monitoramento e controle facilita a interação do usuário, permitindo o acompanhamento do estado das baterias e ajustes conforme necessário.

* **Custo Acessível:** Utilizando componentes otimizados e um chassi projetado para minimizar o peso sem comprometer a resistência, o EnergyDrive pode ser desenvolvido com custos relativamente baixos em comparação com outras soluções de transporte e carregamento de baterias disponíveis no mercado. Isso torna o EnergyDrive uma opção atraente para equipes de competição que buscam uma solução eficiente e econômica.

* **Flexibilidade e Customização:** O EnergyDrive pode ser facilmente adaptado e personalizado de acordo com as necessidades específicas das equipes de competição. Além disso, o sistema de software embarcado pode ser atualizado e aprimorado com novos recursos e funcionalidades à medida que o projeto evolui.

* **Potencial de Mercado:** Com o crescente interesse em competições como a Fórmula SAE e a necessidade de soluções seguras e eficientes para o transporte e carregamento de baterias, o EnergyDrive tem um amplo mercado-alvo que inclui equipes de competição, instituições educacionais e entusiastas de engenharia. Além disso, o projeto pode encontrar aplicações em áreas como pesquisa e desenvolvimento de veículos elétricos.

* **Suporte à Segurança e Sustentabilidade:** A capacidade de monitorar e controlar o carregamento das baterias de forma segura contribui para a redução de riscos e incentiva práticas mais sustentáveis. O EnergyDrive apoia a segurança das operações e a conformidade com as normas da competição, promovendo um ambiente de aprendizado seguro e eficiente para futuros engenheiros.

## 9. Referências

IBM Knowledge Center - Documento de Visão: A estrutura de tópicos do documento de visão. Disponível em: https://www.ibm.com/support/knowledgecenter/pt-br/SSWMEQ_3.0.1/com.ibm.rational.rrm.help.doc/topics/r_vision_doc.htm. Acesso em: 03 dez. 2024;

MIGUEL, Alexandre; ALVES, Dani; GUEDES, Gabriela; GOULART, Helena; ROBSON, João; MENEZES, Leticia; GUILHERME, Luiz; SCHADT, Renan; VINICIUS, Rômulo; HUGO, Victor. Projeto translate.me: Documento de Visão. Disponível em: https://translate-me.github.io/docs/documentos/projeto/doc_de_visao/. Acesso em: 03 dez. 2024;

Souza, P. (2014). Lean Inception: Como Alinhar Pessoas e Construir o Produto Certo. São Paulo: Editora Casa do Código. Acesso em: 03 dez. 2024;



## 10. Histórico de Revisão

| Versão | Data | Descrição | Autor |
|----|----|----|----|
| 1.0 | 03/12/2024 | Produção do Documento| [Matheus Neubern](https://gitlab.com/Neubern) |
| 1.1 | 03/12/2024 | Produção do Documento| [Erick levy](https://gitlab.com/Ericklevy) e [Matheus Neubern](https://gitlab.com/Neubern) |
| 1.2    | 12/01/2025 | Correções do texto em relação a entrega C2 |  [Erick levy](https://gitlab.com/Ericklevy) e [Rodrigo Carvalho](https://gitlab.com/RocSantos) |
| 1.3    | 12/01/2025 | Remoção de documentos errados Lean Inception. |  [Luís Furtado](https://gitlab.com/luis-furtado) |