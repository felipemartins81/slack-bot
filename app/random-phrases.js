'use strict';

let lastRandom = { 'messageType':'', 'number':0 },
    lastMessageHasRandomEmogi = false;

function getRandomNumber(_size){
    return Math.floor(Math.random() * _size);
}

let moduleExports = {

    getRandomMessage: () => {
        switch(lastRandom.messageType){
            case 'movie':
                console.log('sending music');
                return moduleExports.getMusicPhrase();
            case 'music':
                console.log('sending mktp');
                return moduleExports.getMktpPhrase();
            case 'mktp':
                console.log('sending image');
                return moduleExports.getFunnyImage();
            case 'image':
                console.log('sending movie');
                return moduleExports.getMoviePhrase();
            // case 'samba':
            //     return moduleExports.getFunnyImage();
            default:
                let randomNum = getRandomNumber(4);
                switch(randomNum){
                    case 0:
                        console.log('sending movie');
                        return moduleExports.getMoviePhrase();
                    case 1:
                        console.log('sending music');
                        return moduleExports.getMusicPhrase();
                    case 2:
                        console.log('sending mktp');
                        return moduleExports.getMktpPhrase();
                    case 3:
                        console.log('sending image');
                        return moduleExports.getFunnyImage();
                    // case 3:
                    //     return moduleExports.getSambaPhrase();
                }
        }
    },

    getRandomEmogi: () => {
        if(lastMessageHasRandomEmogi){
            lastMessageHasRandomEmogi = false;
            return '';
        }
        let emogis = [
            ':thinking_face:\n',
            ':eyes:\n',
            ':cry:\n',
            ':joy:\n',
            ':sunglasses:\n',
            ':face_with_rolling_eyes:\n',
            ':innocent:\n',
            ':v:\n',
            ':ok_hand:\n'
        ];
        lastMessageHasRandomEmogi = true;
        return emogis[ getRandomNumber(emogis.length) ];
    },

    getMktpPhrase: () => {
        let phrases = [
            ':hand: Num sei! :hand:',
            'Me respeita!',
            'Temos que Retaforar isso!',
            'Achei ofensivo! Continua...',
            'Adicionado no array de Arrogancia',
            'Sem conversa paralela galera! Vamo trabalhar!',
            'Essa eh uma questao para o THE PROFESSOR',
            'C é loko!\nNunca mais eu vou dormir!',
            'Iiii, que isso? Mycow Douglas? :smoking:',
            'Hoje eu vou Sbagaçar... To Brabo!',
            'Não me acompanha... que eu não sou novela!',
            'Só sei que nada sei',
            'Vcs tão sem trampo ae?',
            'Da uma segurada que hoje ta puxado aqui',
            'Imagina na Copa!',
            'Itervenção Militar já! \nRespeita os militares brasileiros.'
        ];
        lastRandom.messageType = 'mktp';
        lastRandom.number = getRandomNumber(phrases.length);
        return phrases[ lastRandom.number ];
    },

    getMoviePhrase: () => {
        let phrases = [
          'Quer me foder, me beija!',
          'Cada cachorro que lamba a sua caceta!',
          'Ta se achando o pica das galáxias!',
          'Bota na conta do papa!',
          'Missão dada é missão cumprida, parcero!',
          'Quem quer rir, tem que fazer rir!',
          'Bot é o caralho! Meu nome agora é Zé Pequeno!',
          'Não sei! Só sei que foi assim!',
          'Faca na caveira e nada na carteira! :knife: :skull_and_crossbones:  '
        ];
        lastRandom.messageType = 'movie';
        lastRandom.number = getRandomNumber(phrases.length);
        return phrases[ lastRandom.number ];
    },

    getFunnyImage: () => {
        let phrases = [
          'http://vignette1.wikia.nocookie.net/uncyclopedia/images/1/15/Will_code_html_for_food.jpg/revision/latest?cb=20070820063439',
          'http://media.tumblr.com/tumblr_ltmyjhOQ391qlvfgx.gif',
          'https://i.pinimg.com/originals/81/20/31/812031e9b21bfdffd3fa15a6131cd474.jpg',
          'https://media.giphy.com/media/xTiTnJ3BooiDs8dL7W/giphy.gif',
          'https://i.imgflip.com/aw6ug.jpg',
          'https://www.walldevil.com/wallpapers/a51/thumb/wallpapers-wallpaper-fresh-badass-images.jpg',
          'http://m.memegen.com/vsyvug.jpg',
          'http://s2.glbimg.com/_BXvc5YRYNViZibdN7PlLSQPgWs=/smart/e.glbimg.com/og/ed/f/original/2015/09/18/instagram-compadre-washington.jpg',
          'Voce é o Bichão memo ein! \nhttps://i.makeagif.com/media/6-24-2015/IIgKKj.gif',
          'https://68.media.tumblr.com/fefbe81d7c5488491bae2cef8e7f742a/tumblr_mfokuuIaeM1qcj1hao6_r2_250.gif'
        ];
        lastRandom.messageType = 'image';
        lastRandom.number = getRandomNumber(phrases.length);
        return phrases[ lastRandom.number ];
    },

    getBugImage: () => {
        let phrases = [
          'http://s2.quickmeme.com/img/85/850a61abc00b53f7c804cc85711cf7d1305da78e5a35aae0b230a660db160c92.jpg',
          'https://s-media-cache-ak0.pinimg.com/originals/6a/11/a8/6a11a884abbe469d87a797ced5d1b7cc.jpg',
          'http://gabijack.com/wp-content/uploads/2014/07/ah728-300x258.jpg',
          'https://pbs.twimg.com/media/CKhg8baUMAAjQ4O.jpg'
        ];
        // lastRandom.messageType = 'bugImage';
        lastRandom.number = getRandomNumber(phrases.length);
        return phrases[ lastRandom.number ];
    },

    getMusicPhrase: () => {
        let phrases = [
          // Rap
          'Acorda sangue bom!\nAqui é Capão Redondo (true), não o Pokemon.',
          'Cada lugar um lugar, cada lugar uma lei, cada lei uma razão!\nEu sempre respeitei!',
          'Tudo vai, tudo é fase irmão!\nVamo logo mais arrebentar no mundão!',
          'Po eu to confuso, preciso pensar.\nMe da um tempo pra eu raciocinar\nEu ja não sei distinguir, quem ta errado? Sei lá!',
          'Eu tenho que me desdobrar pra não puxarem meu tapete!\nEstar sempre quente pra não ser surpreendido de repente.',
          'Se eu vacilo trocam minha vaga!\nO que você fizer aqui mesmo você paga!',
          'Prego! Jogou o ego, detro do buraco!\nO bom vivam jamais mostra o ponto fraco!',
          'Eu só confio em mim, em mais ninguém! Vc me entende?\nFalo giria bem, até papagaio aprende!',
          'Presente de grego né? Cavalo de tróia!\nNem tudo que brilha é reliquia, nem jóia!',
          '171 furado aqui não compra ninguém!\nCorromper a minha mente, ai, nem vem!',
          'Malandrão, eu? Não, ninguém é bobo!\nSe quer guerra, terá! Se quer paz, quero em dobro!',
          'Pros parceiros, tenho a oferecer minha presença!\nTalvez até confusa, mas leal e intensa!',
          'Alguns querem Nissan!\nOutros só tem Nissin\nE os criados a Neston, nunca terão noção!',
          'Falou o malandro Aceróla...\nAquele que vale por vinte Laranjas!',
          'Agora é tarde pra querer ser Aliado\nPor que eu sei o que vocês fizeram no verão passado!',
          'Traz um Engov que hoje o Pai ta enjoado! :sunglasses:',
          'Não sou seu Mano, e ó o volume no debate!\nQue cão que é brabo memo só fareja e quase nao late!',
          'Nois que voa, Bruxao!',
          'Pra cima de mim? Caô do caralho!\nC sabe ler? Lê na minha testa e vê se tá escrito Otário!',
          'E aquela minazinha lá?\nTa sem um $din pra bancar?\nVai dar role de Mobilete!\nOu cinema no Gato-Net!',
          'Tem gente sem visão, sem amor\nCom o olho do tamhanho de um hamburger no progresso dos trabalhador!',
          'Sei nem quem é Mano! \nNão devo, não temo e dá meu copo que... já era!',
          'Tem gente sem visão, sem amor \nCom o olho do tamanho de um hambúrguer no progresso dos trabalhador!',
          // Samba
          //'Se eu soltar meu cachorro ele vai te pegar\nÉ um Vira-lata ruim de aturar\nJa matou Pitbull sem sair do lugar',
          //'Vou te dizer o que eu acho, sem nenhum constragimento\nQuem tem teto muito baixo não se mete em casamento!',
          //'Minha Nega é maneta e além de maneta é cega de um olho!\nÉ cega de um olho, tem pouco cabelo e no pouco cabelo carrega piolho! :joy:',
          //'Nem vem que não tem\nNem vem de garfo que hoje é dia de sopa!'
          'Eu falei uma vez, eu tô muito bolado, e novamente vou falar \nPra curar safado, é bom tá ligado, vacina é bala de AK.',
          'Se for 171, pé rapado\nSe meteu no meio de um fogo cruzado\nUma bala perdida! Cuidado! Ela pode te achar!',
          'Em rio que tem piranha, Jacaré nada de costas!',
          'Camarão que dorme a onda leva',
          'Se Leonardo Da Vinte, porque é que eu não posso dar uns dois?',
          'Malandro é Malandro!\nMané é Mané!',
          'Quem tem cabra que segure\nPor que o meu bixo ta solto!'
        ];
        lastRandom.messageType = 'music';
        lastRandom.number = getRandomNumber(phrases.length);
        return phrases[ lastRandom.number ];
    },

    getSearchTermsToLunch: () => {
        let phrases = [
          'restaurante',
          'lanchonete',
          'pizzaria',
          'churrascaria',
          'almoço'
        ];
        return phrases[ getRandomNumber(phrases.length) ];
    },

    getPhraseInviteToLunch: () => {
        let phrases = [
          'Bora come?\nSugestão do dia...\n\n',
          'Hora do rango!\nSugestão do dia...\n\n',
          'Bateu a larica ein!\nSugestão do dia...\n\n',
          '#partiuAlmoço\nSugestão do dia...\n\n',
          'Qual vai ser hj?\nSugestão do dia...\n\n',
          'Bora almoçar? Depois #petigas?\nSugestão do dia...\n\n',
          'Bora comer ? Ou vai de marmita?\nSugestão do dia...\n\n',
        ];
        return phrases[ getRandomNumber(phrases.length) ];
    },

    getPhraseToFriday: () => {
        let phrases = [
            'Comitei. Puxei. Vazei... \nhttps://thumbs.gfycat.com/WhimsicalGiantBorer-max-1mb.gif \nAté segunda!',
            '#Fui #QuemMeViuMentiu \nhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOXdE48mfpUVsaAKyrsltwdFl9yMgrhZh-KrZ6NcapkOi_36qX9g \nAté segunda!',
            '#Sextou? \nCom dinheiro é Água de Coco, Jackie Daniels, só Scoth... \nSem dinheiro é Corotinho, Dollly Citrus, Vinho forte! \nAté segunda!',
            'Mulekada! \nFinalmente chegamos na sesta-feira!\n\nAlcool, Prostitutas, Assar animais de pequeno porte, Armas de fogo.\n\nVálido após o horário comercial! Até segunda!',
            '#partiuFDS \n\nDel Rey brilhando\nCerveja trincando\nCarne assando\nAmado Batista tocando\nCigarro queimando\nProstitutas trabalhando\nFinal de semana começando!! :knife: :skull:',
            'Logo menos... \nhttps://media.tenor.com/images/707de10848a5924829c84139129bbc44/tenor.gif \n#partiuFDS',
            'Fuga! \n\n Partiu Vila Romana \nDescer a Sumaré a milhão pq ta pegando lá!!'
        ];
        return phrases[ getRandomNumber(phrases.length) ];
    },

    getPhraseToMonday: () => {
        let phrases = [
          'Cinzero limpo\nLatinhas amassadas\nRevolver guardado\nProstitutas pagas\nDel Rey na garagem\n\nÉ com pesar que informo: Está encerrado o final de semana! :angel: ',
          'Apagando o Dérby\nTomando a Skol saideira\nGuardando o vidro de ovo de codórna\nDesligando o vinil do Reginaldo Rossi\n\nEstá finalizado o fim de semana!!'
        ];
        return phrases[ getRandomNumber(phrases.length) ];
    }

}

module.exports = moduleExports;
