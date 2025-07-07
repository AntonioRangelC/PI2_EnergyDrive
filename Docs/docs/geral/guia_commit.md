## Guia de commit

Esse guia tem o objetivo de definir um padrão para os commits no projeto.

### Branch

Para a criação de branchs deve seguir o padrão de número da issue seguida de breve descrição:
```
US01-CriarFluxogramaSoftware
```

Para casos de documentação sem números especificos de issue, inicializar com *DOCS*:
```
DOCS-CriarFluxogramaSoftware
```

#### Criar branch
```
git checkout -b "nome da branch"
```

#### Mudar de branch
```
git checkout "nome da branch"
```

### Commits

Os commits serão separados por funcionalidades, devendo respeitar o formato abaixo:

+ :bulb: quando adicionar nova funcionalidade

+ :memo: quando escrever documentação

+ :repeat: quando alguma alteração for feita

+ :racehorse: refatoração ou otimização

+ :bug: quando consertar um bug

+ :fire: quando remover código ou arquivos

##### Criar commit
```
git commit -m "mensagem"
```

#### Grupos

Commits em grupo devem ter ser adicionado a mensagem do commit:

*Co-authored-by: 'nick do membro' 'email do membro'*

##### Criar commit em grupo 
```
git commit -m "mensagem <dar enter>
> <dar enter novamente>
> Co-authored-by: <digitar nick do co-autor> <digitar email do co-autor>"
```

#### Mensagem

A mensagem de commit deve ser clara e sucinta, respeitando o formato abaixo:

- Escrita em português

- Verbos no gerúndio

- Deve possuir um tipo e o objetivo do commit

#### Exemplos

##### Commit de um único autor
```
:bulb: Adicionando crud de usuário
```

##### Commit em grupo
```
:bug: Consertando crud de usuário
Co-authored-by: CibeleG cibelegoudinho13@gmail.com
```

#### Publicar alterações

##### Ao criar nova branch
```
git push -u origin nome-da-branch
```

##### Alterações sem nova branch
```
git push
```

#### Recuperar alterações
*IMPORTANTE:* sempre realizar esse comando na branch *MAIN* antes de começar qualquer trabalho e antes de publicar sua branch e suas alterações.
```
git pull
```
ou
```
git fetch origin nome-da-branch
```

Para o git pull precisa estar na branch que quer atualizar, já para o fetch você irá puxar alterações da branch escolhida para a sua atual.

## Histórico de versão
| Data | Versão | Descrição | Autor(es) |
| ---- | ---- | ---- | ---- |
| 14/11/2024 | 1.0 | Criação do Documento | Cibele Freitas Goudinho |