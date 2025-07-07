# Integração dos subsistemas

<p style="text-align: justify;">
O projeto EnergyDrive envolve a integração de componentes eletrônicos, software e estrutura física para criar um sistema de carregamento e transporte preciso e eficiente.

Na parte eletrônica, o sistema é composto por dois módulos BMS (Battery management System) modelo BQ79616-Q1, um controlador LAUNCHXL2-TMS57012, uma raspberry pi 3 model B, um relé termico 12V 40A, uma fonte 5V 40A, um carregador específico para baterias de carros da FSAE, um botão para desligamento total do sistema, três sinaleiras de led.

O software desempenha um papel crucial no processamento dos dados capturados pelos sensores do BMS. Utilizando comunicação via CANbus, os dados de tensão e temperatura são enviados para serem analisados e convertidos em um modelo digital.

A estrutura física do carrinho é projetada para acomodar e transportar todos os componentes de maneira eficiente, segura e organizada. É essencial que a estrutura ofereça um acesso adequado ao componentes eletrônicos e mantenha uma estética limpa, escondendo a fiação. A precisão no design da estrutura é fundamental para garantir que os deslocamentos dos componentes e armazenamento sejam suaves e práticos, permitindo um carregamento e transporte seguros.

</p>

## Estrutura e energia

<p style="text-align: justify;">
A integração dos subsistemas de energia e estrutura do projeto consiste na construção de um compartimento para abrigar componentes dos subsistemas de energia e eletrônica. Feita em madeira MDF, os componentes estarão
apoiados diretamente neste material, já que o mesmo possui baixa condutividade.
Assim como as baterias, os barramentos e cabos também estarão fixados na caixa, para evitar um possível curto-circuito causado pelo contato desses componentes.

</p>

## Estrutura e eletrônica

<p style="text-align: justify;">
A área de estrutura se integra à área eletrônica a fim de solucionar o transporte seguro dos componentes, se preocupando principalmente com peso e estabilidade

A parte eletrônica precisa de um carro capaz de transportar e armazenar todos os componentes do sistema de carregamento, sistemas de controle e do protocolo de segurança. Portanto é de suma importancia que a estrutura consiga armazenar esse sistemas e fazer o deslocamento de maneira segura para a execução do carregamento.

</p>

## Energia e eletrônica

<p style="text-align: justify;">
O subsistema de energia é responsável por fornecer as tensões e correntes adequadas para alimentar os componentes dos sistemas de eletrônica. Portanto a montagem dos dois subsistemas foram feitos de maneira integral, a fim de proporcionar uma alimentação de 5V para a boa parte dos sistemas eletrônicos e 12 para outros.
</p>

## Software e eletrônica

<p style="text-align: justify;">
Como definido na arquitetura, a comunicação entre o Software e eletrônica será feita pelo raspberry transmitindos os dados via um módulo. A dificil comunicação está entre o sistema embarcado com a raspberry, no qual demanda uma complexidade grande para serem transmitidos via CANbus.
</p>

### Controle do Sistema de carregamento

<p style="text-align: justify;">
Para que o carregamento seja feito de modo seguro, fora criado um sistema embarcado complexo de comunicação e monitoramento dos módulos.
No sistema, a leitura dos dados irá indicar se o carregamento está sendo feita de maneira segura e eficiente. Em caso de algum problema nas métricas apontadas de tensão e temperatura, o acionamento remoto do desligamento de emergência será feito e, em caso de falha, o acionamento presencial do botão de emergência será feito e o TMZ desligará o sistema por completo

### Monitoramento Remoto

<p style="text-align: justify;">
Para realização do monitoramento remoto é de suma importância que o software receba bem os dados do raspberry e os armazene. Para que se possa visualizar os dados enviados do controlador TMZ, o software deverá receber as tensões e temperatura das células e organizálos de maneira intuitiva para o usuário, além de enviar alertas visuais em casos extremos. 
</p>

## Desafios

<p style="text-align: justify;">
O maior desafio do projeto, no quesito integração de subsistemas é a comunicação entre TMZ e software, fora criado um sistema embarcado que envia os dados através do CANbus para a raspberry que manda para um módulo que, por fim, envia os dados para o programa.  
</p>

# Tabela de versionamento

| Versão     | Data | Responsável                                   | Descrição                                                                                     |
| ---------- | ---- | --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 03/12/2024 | 0.1  | [Matheus Neubern](https://gitlab.com/Neubern) | Criação do Documento                                                                          |
| 12/01/2025 | 0.2  | atualização do texto e nome do projeto        | [Erick levy](https://gitlab.com/Ericklevy) e [Rodrigo Carvalho](https://gitlab.com/RocSantos) |
