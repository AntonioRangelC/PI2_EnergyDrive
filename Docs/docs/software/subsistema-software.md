# Projeto de Subsistema de Software

Para o projeto de software, serão utilizadas diversas tecnologias já conhecidas no mercado. A escolha das mesmas, bem como as ferramentas auxiliares, visa o desenvolvimento de uma aplicação voltada a dispositivos móveis.

## Arquitetura de Software

A arquitetura do sistema oferece uma visão geral que representa os componentes principais e as interações entre eles. No projeto em questão, foram projetadas duas aplicações distintas, que garantem eficiência e clareza na integração entre os subsistemas:

1. Uma aplicação web, destinada ao gerenciamento dos dados e à visualização do status das baterias.
2. Uma aplicação embarcada, desenvolvida para ser executada na Raspberry Pi, responsável pela comunicação direta com os sensores e coleta de informações em tempo real.

O documento que contempla a visão completa e precisa da arquitetura do software pode ser encontrado acessando o seguinte link: [Documento de arquitetura](./arquitetura.md).

### Diagrama de classes

O diagrama de classes representa a abstração do problema real em classes da aplicação. Para mais detalhes a respeito do atual diagrama, acesse o artefato do diagrama de classes em: [Diagrama de Classes](./diagrama_de_classes.md).

### Diagrama de pacotes

O projeto contará com o Next.js, que ficará responsável por tratar os dados do MongoDB, que serão persistidos através de um serviço que o atualizará com os dados dos sensores através do protocolo CANbus e disponibilizará em tela para o usuário através de uma aplicação web. Um outro serviço ficará responsabilizado pela parte de notificações ao usuário pelo Telegram e pelo WhatsApp.

Para visualizar o diagrama de pacotes de forma mais detalhada e completa, acesse: [Diagrama de Pacotes](./diagrama_de_pacotes.md).

### Diagrama de fluxo de execução

O fluxo de execução demonstra como o sistema lida com situações inesperadas, garantindo a integridade dos dados e a continuidade dos processos. Cada etapa do fluxo é projetada para identificar, tratar e registrar erros, minimizando impactos e fornecendo feedback claro ao usuário.


### Tecnologia utilizada

#### React Native

React Native é um framework open-source desenvolvido pelo Facebook para criar aplicativos móveis multiplataforma utilizando JavaScript e React. Ele permite que os desenvolvedores criem aplicativos nativos para iOS e Android a partir de um único código-base.

Os motivos da escolha da ferramenta foram:

- Desenvolvimento multiplataforma;
- Eficiência de desenvolvimento com JavaScript e React;
- Comunidade ativa;
- Biblioteca vasta de componentes e plataformização.

#### MongoDB

MongoDB é um banco de dados NoSQL, orientado a documentos, amplamente utilizado para armazenar e gerenciar grandes volumes de dados de forma flexível e escalável. Ele organiza os dados em documentos no formato JSON, o que facilita a integração com linguagens de programação modernas e frameworks de desenvolvimento.

Os motivos da escolha da ferramenta foram:

- Alta performance: ideal para aplicações que exigem baixa latência e alta disponibilidade;
- Consulta flexível: oferece uma linguagem de consulta poderosa e recursos como índices complexos e agregações;
- Modelo orientado a documentos: os dados são armazenados como documentos JSON, permitindo maior flexibilidade e facilidade de leitura.

O MongoDB será o responsável pelo armazenamento e gerenciamento de dados no projeto, principalmente o histórico de carregamento e status das baterias, ambos no formato JSON.

#### Protocolo CANbus

Protocolo CANbus (Controller Area Network) é um protocolo de comunicação robusto e eficiente, amplamente utilizado em sistemas embarcados e automotivos para a troca de dados entre microcontroladores e dispositivos.

Os motivos da escolha da ferramenta foram:

- Alta confiabilidade: o CANbus é projetado para operar em ambientes ruidosos, garantindo a integridade dos dados transmitidos;
- Suporte a múltiplos dispositivos: permite a comunicação entre vários dispositivos em uma única rede, facilitando a integração de sensores e atuadores;
- Eficiência na comunicação: oferece alta taxa de transferência de dados e baixa latência, essencial para aplicações em tempo real.

O CANbus será utilizado para a comunicação entre a Raspberry Pi e os sensores, garantindo a coleta eficiente e confiável dos dados das baterias.

#### Next.js

Next.js é um framework open-source baseado em React que permite a construção de aplicações web modernas, com foco em desempenho, escalabilidade e flexibilidade.

Os motivos da escolha da ferramenta foram:

- Facilidade na construção de APIs: o Next.js permite criar endpoints de API diretamente na pasta `pages/api/`, sem a necessidade de configurações adicionais;
- Renderização otimizada: como o projeto envolve exibição de dados, como dashboards ou informações sensoriais, a renderização Server-Side Rendering (SSR) do Next.js será bastante úteil.

## Interface

### Protótipo de alta fidelidade

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/design/3xoQ00lTBBhyQRMNTaK1aq/Arthur-Melo's-team-library?node-id=0-1&embed-host=share" allowfullscreen></iframe>

Caso não consiga visualizar o iframe acima, acesse o protótipo de alta fidelidade pelo link a seguir: [link](https://embed.figma.com/design/3xoQ00lTBBhyQRMNTaK1aq/Arthur-Melo's-team-library?node-id=0-1&embed-host=share).

## Tabela de versionamento

| Versão | Data       | Descrição                               | Responsável                                                                                       |
| ------ | ---------- | --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1.0    | 21/11/2024 | Criação do documento                    | [Arthur de Melo](https://gitlab.com/ArthurMeloG) e [Eliás Yousef](https://gitlab.com/eliasyousef) |
| 1.1    | 22/11/2024 | Incrementos descritivos do projeto      | [Arthur de Melo](https://gitlab.com/ArthurMeloG) e [Eliás Yousef](https://gitlab.com/eliasyousef) |
| 2.0    | 25/11/2024 | Finalização do documento de subsistemas | [Arthur de Melo](https://gitlab.com/ArthurMeloG) e [Eliás Yousef](https://gitlab.com/eliasyousef) |
| 2.1    | 14/01/2025 | Atualização documento                   | [Erick levy](https://gitlab.com/Ericklevy) e [Rodrigo Carvalho](https://gitlab.com/RocSantos)     |
