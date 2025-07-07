# Exemplo de Subsistema de Estruturas

## Projeto do Subsistema de Estruturas

### Materiais

#### Definição de Critérios de Avaliação dos Materiais

Foi elaborada uma matriz de decisão, optando pela alternativa de menor custo e maior facilidade de fabricação.

| Ideia           | Custo | Fabricação | Assembly | Segurança | Robustez | Peso | Resultado |
|------------------|-------|------------|----------|-----------|----------|------|-----------|
| Quadrado         | 9     | 6          | 10       | 10        | 9        | 5    | 49        |
| Redondo          | 9     | 3          | 5        | 10        | 10       | 5    | 42        |
| Chapa em L       | 9     | 8          | 7        | 5         | 3        | 8    | 40        |
| Chapa Simples    | 9     | 9          | 10       | 2         | 2        | 10   | 42        |


#### Definição de critérios de avaliação dos materiais

Foi elaborada uma matriz de decisão e optamos pela alternativa de menor custo e maior facilidade de fabricação. 

| Ideia     | Custo | Fabricação | Resistência | Peso | Resultado |
|-----------|-------|------------|--------------|------|-----------|
| Aço SAE   |   9   |      6     |       7      |   5  |     27    |
| Alumínio  |   5   |      3     |       8      |   8  |     24    |
| Titânio   |   1   |      1     |      10      |  10  |     22    |



### Análise Estrutural Preliminar

#### Simulações Numéricas

- **Setup da Simulação:**
  - Carga aplicada: 144 kg (1440 N) distribuída.
  - Fixação: Rodas como pontos de apoio.

Os deslocamentos máximos nas superfícies ocorrem no centro das bases superiores e inferiores, com valores inferiores a 3 mm, indicando rigidez adequada.

- **Imagens: Estão no Documento PDF**

  
  1. Distribuição de forças sobre a estrutura.
  [Imagem Distribuição de forças sobre a estrutura](../estruturas/imagens/Subsistema%20de%20Estruturas.pdf)
  2. Deformação da estrutura.
  [Deformação da estrutura](../estruturas/imagens/Subsistema%20de%20Estruturas.pdf)
  3. Tensão da estrutura.
  [Deformação da estrutura](../estruturas/imagens/Subsistema%20de%20Estruturas.pdf)

---

## Subsistema de Estruturas

### 1. Seleção de Materiais

Os materiais escolhidos para a estrutura do carrinho foram selecionados com base em critérios como resistência mecânica, custo, fabricação e disponibilidade no mercado. Os principais materiais adotados que passaram por matriz de decisão foram o aço tubular quadrado SAE 1010 e as bases de MDF, devido à sua combinação de resistência e custo-benefício.  

#### 1.1 Critérios de Escolha dos Materiais

O critério de escolha englobou os materiais da estrutura metálica e MDF utilizado como apoio para os equipamentos. Tal escolha foi devido aos custos envolvidos e fabricação, segurança e robustez. 

#### 1.2 Justificativa da Escolha do Material
- **Aço tubular quadrado SAE 1010**:   Baixo custo, facilidade de usinagem, boa soldabilidade e versatilidade de aplicações. 
- **Parafusos de aço**:  Utilizados em pontos de conexão desmontáveis, resistentes à corrosão. 

---

### 2. Projeto Estrutural

#### 2.1 Modelagem CAD
O subsistema foi modelado no software CAD (CATIA V5), com foco na otimização do espaço para armazenamento e deslocamento de baterias e equipamentos. O design inclui reforços em pontos críticos e suporte para rodas e sistemas mecânicos.

#### 2.2 Ensaios Estruturais
Para validar o dimensionamento preliminar, foi realizada uma análise estrutural estática no software Ansys Workbench, considerando o seguinte cenário: 
- **Carga estática máxima**: Simulação de cargas distribuídas pela estrutura totalizando cerca de 144 kg. 

A análise estática foi realizada visando possíveis deformações na estrutura devido o carregamento de peso sob as bases e tubos. 

Resultados indicam que a tensão máxima ficou abaixo do limite elástico do aço (250 MPa), garantindo segurança estrutural. 


#### 2.3 Montagem
- **Soldagem**:  Os perfis de aço são unidos por solda, que proporciona alta resistência e acabamento limpo. 
- **Pontos de Fixação**:  Os componentes removíveis, como rodas,MDFs e carregador utilizam parafusos padrão M6x50 sextavados, porcas e arruelas para facilitar desmontagem e manutenção. 

---

### 2.4 Dimensionamento da constante elástica da mola do sistema de freio 

O dimensionamento do sistema foi realizado utilizando o software Matlab, considerando um carrinho de baterias em um plano inclinado. A mola do sistema de freio, previamente escolhida por fatores comerciais, possui uma constante elástica de 34.021 N/m. Foram realizadas três análises: a primeira considerou a inclinação máxima de 8,33° recomendada pela norma NBR 9050, resultando em uma constante elástica necessária de 3.363,57 N/m; a segunda análise determinou que a mola suporta inclinações de até 88°, com uma constante de 23.185,37 N/m; e a terceira análise, que considerou o atrito pneu-solo (coeficiente de 0,5), limitou a inclinação máxima a 14°. Concluiu-se que o fator limitante é o atrito pneu-solo, e a mola utilizada é eficaz para todas as inclinações, sendo adequada para situações práticas, mesmo em estradas íngremes.

Para mais dados entre no pdf abaixo

 1. Dimensionamento da constante elástica da mola do sistema de freio.
  [Dimensionamento da constante elástica da mola do sistema de freio](../estruturas/imagens/Dimensionamentodamoladosistemadefreio.pdf)

### 4. Considerações Finais
O subsistema de estruturas do carrinho foi projetado para atender aos requisitos funcionais de suportar cargas de baterias, equipamentos e itens de segurança, e ser facilmente manobrável. A análise estática realizada confirma a capacidade da estrutura de suportar as cargas previstas, estando de acordo com os objetivos desejados. 

## Versionamento

| Versão | Data       | Modificação          | Autor |
|--------|------------|----------------------|-------|
| 0.1    | 20/11/2024 | Criação do documento | [Carlos Eduardo](https://gitlab.com/a.cadu), [Gabriellen Ferreira](https://gitlab.com/Gabriellen8) , [Ismael Andrade](https://gitlab.com/IsmaelAndrade) e [Kleyson Silva](https://gitlab.com/KleysonNacarat)    |
| 1.0   | 18/02/2025 | Ultima atualização | [Carlos Eduardo](https://gitlab.com/a.cadu), [Gabriellen Ferreira](https://gitlab.com/Gabriellen8) , [Ismael Andrade](https://gitlab.com/IsmaelAndrade) e [Kleyson Silva](https://gitlab.com/KleysonNacarat)    |