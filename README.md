***To read this documentation in english, [click here](./README-en-us.md)***

<div style="border: solid 2px black; border-radius:4px; padding:10px">
  <span style="font-size: 2.5em"> :heavy_exclamation_mark: Aviso</span>
  <p style="font-size: 1.2em">O Glitch Art Bot foi reescrito em TypeScript e este repositório só existe para fins de arquivação. Acesse o repositório atualizado <a href="https://github.com/friaca/glitch-art-bot-ts">clicando aqui</a>.</p>
</div>

# glitch-art-bot

Bot do Twitter (@GlitchArtBot) que aplica efeitos de glitch art em imagens.

## Como funciona

O bot usa as credenciais dele, conecta na stream do Twitter e fica "ouvindo" quando algum usuário menciona o nome de usuário dele, então ele verifica se o tweet "pai" do qual ele foi mencionado tem uma imagem válida (arquivos classificados como `photo` pelo Twitter), se tiver, o bot baixa a imagem, atualiza o arquivo usado como configuração pro processamente da imagem, cria um processo filho e executa um comando que aplica os efeitos na imagem, então responde o usuário que mencionou o bot com a imagem editada.

## Como usar

Por enquanto o bot só tem um script disponível, então ele o usa por padrão. Pra usar é só mencionar o bot (@GlitchArtBot) como resposta em qualquer tweet que tenha uma imagem. Tenho planos pra adicionar mais scripts e opções pra personalizar os scripts.

*Obs.: Tanto o usuário que menciona o bot quanto o usuário que postou o tweet que tem a imagem **NÃO** podem ter os tweets "protegidos", senão o bot não consegue enxergar os tweets.*

## Scripts disponíveis

**Por mais que a maioria, (senão todos) os scripts não sejam de autoria minha, eles tiveram que ser ajustados pra funcionarem corretamente com o bot. Pra ver os scripts usados pelo bot e como usá-los, ~~clique aqui~~ (em breve).*

- Pixel Sort pelo [Kim Asendorf](https://github.com/kimasendorf) ([fonte](https://github.com/kimasendorf/ASDFPixelSort/blob/master/ASDFPixelSort.pde))

## TODO

- [ ] Adicionar mais scripts
- [ ] Adicionar personalização pra cada script, se possível
- [ ] Poder escolher qual imagem editar, se houver mais de uma num tweet