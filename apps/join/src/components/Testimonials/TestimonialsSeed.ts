interface Testimonial {
  agent: string;
  en: string;
  es: string;
  pt: string;
  it: string;
  fr: string;
  client?: string;
  figure: string;
}

export type TestimonialsSeed = {
  [country: string]: Testimonial[];
};

export const TESTIMONIALS_SEED = {
  spain: [
    {
      agent: 'CG Real Estate',
      client: 'Christian Alexander',
      en: 'We have been working very closely with Kyero since 2005, their reach, marketing and online positioning helping us to get our properties out to all potential buyers is unrivalled.',
      es: 'Llevamos trabajando muy estrechamente con Kyero desde 2005, su alcance, marketing y posicionamiento online no tiene rival.',
      pt: "Temos trabalhado em estreita colaboração com o Kyero desde 2005, o seu alcance, 'marketing' e posicionamento 'online, que nos ajuda a levar as nossas propriedades a todos os potenciais compradores, é incomparável.",
      it: 'Lavoriamo a stretto contatto con Kyero dal 2005: la loro portata, il marketing e il posizionamento online ci aiutano a far conoscere le nostre proprietà a tutti i potenziali acquirenti non hanno rivali.',
      fr: 'Depuis 2005, nous avons établi une étroite collaboration avec Kyero. Leur portée, leur stratégie marketing et leur positionnement en ligne ont contribué à accroître notre visibilité auprès de tous les acheteurs potentiels pour nos propriétés.',
      figure: 'cg-real-estate',
    },
    {
      agent: 'Target Property Spain',
      client: 'Keith Spitalnick',
      en: "Lead numbers have grown exponentially since upgrading to Prime. We've even had to expand our telesales team just to deal with the enquiries.",
      es: 'El número de clientes potenciales ha crecido exponencialmente desde la actualización a Prime. Incluso hemos tenido que ampliar nuestro equipo de televentas sólo para atender las consultas.',
      pt: "Os números de ligações cresceram exponencialmente desde a atualização para o 'Prime'. Tivemos mesmo que expandir a nossa equipa de televendas somente para responder aos pedidos de informações.",
      it: "I numeri delle lead sono cresciuti in modo esponenziale dall'aggiornamento a Prime. Abbiamo persino dovuto ampliare il nostro team di televendite solo per gestire le richieste.",
      fr: 'Le passage à Prime a généré une croissance exponentielle de nos prospects. Nous avons ainsi dû renforcer notre équipe de télévente afin de répondre à l’afflux de demandes d’informations.',
      figure: 'target-property-spain',
    },
    {
      agent: 'Desea Homes',
      client: 'Raphael',
      en: 'Kyero Prime gave us visibility and reach that no other property portal has ever given us. In addition, its commercial and technical team is always available for anything you need.',
      es: 'Kyero Prime nos da una visibilidad y el alcance que ningún otro portal inmobiliario nos ha dado. Además, su equipo comercial y técnico está siempre disponible para lo que necesites.',
      pt: 'O Kyero Prime deu-nos a visibilidade e o alcance que nenhum outro portal imobiliário alguma vez nos deu. Além disso, a sua equipa comercial e técnica está sempre disponível para tudo o que precisares.',
      it: 'Kyero Prime ci ha dato visibilità e portata che nessun altro portale immobiliare ci ha mai dato. Inoltre, il suo team commerciale e tecnico è sempre disponibile per qualsiasi esigenza.',
      fr: 'Kyero Prime a révolutionné notre notoriété et notre envergure, surpassant toute autre plateforme immobilière. De plus, leur équipe commerciale et technique est toujours prête à répondre à nos besoins de manière proactive.',
      figure: 'desea-homes',
    },
  ],
  portugal: [
    {
      agent: 'Janela Grande - Imobiliária',
      client: 'Pedro Subtil',
      en: 'The relationship I have established with the Kyero team has been exceptional, always willing to help and provide top quality support to ensure my needs are met.',
      es: 'La relación que he establecido con el equipo de Kyero ha sido excepcional. Siempre están dispuestos a ayudar y a ofrecer un apoyo de la máxima calidad para garantizar que se satisfacen mis necesidades.',
      pt: 'O relacionamento que estabeleci com a equipe do Kyero foi excepcional, sempre disposta a ajudar e oferecer suporte de alta qualidade para garantir que minhas necessidades fossem atendidas.',
      it: 'Il rapporto che ho instaurato con il team di Kyero è stato eccezionale: sempre pronto ad aiutare e fornire un supporto di alta qualità per garantire che le mie esigenze siano soddisfatte.',
      fr: 'Ma relation avec l’équipe de Kyero s’est avérée exceptionnelle. Leur constante disponibilité offre un soutien de qualité supérieure, garantissant ainsi la satisfaction de mes attentes.',
      figure: 'janela-grande',
    },
    {
      agent: 'Infante & Riu',
      client: 'Adelaide Durão',
      en: 'Kyero is already part of our Top 3 international sites with the leads from Prime and having closed 5 deals this year! 96% of leads are from abroad, mainly from the US, UK and Germany.',
      es: 'Kyero ya forma parte de nuestros 3 mejores sitios internacionales, junto con los clientes potenciales de Prime, ¡y ha cerrado 5 operaciones este año! El 96 % de los clientes potenciales proceden del extranjero, principalmente de EE. UU., Reino Unido y Alemania.',
      pt: 'A Kyero já faz parte do Top 3 sites internacionais com as leads do Prime e fechei 5 negócios este ano! 96% das leads são do estrangeiro, principalmente dos EUA, Reino-Unido e Alemanha.',
      it: "Kyero fa già parte dei nostri primi 3 siti internazionali con le lead di Prime e avendo chiuso 5 affari quest'anno! Il 96% dei contatti proviene dall'estero, principalmente da Stati Uniti, Regno Unito e Germania.",
      fr: 'Kyero occupe déjà une place de choix parmi les Top 3 des sites internationaux, grâce aux leads générés par Prime qui ont conduit à la concrétisation de cinq transactions cette année. 96 % des leads proviennent de l’étranger, en particulier des États-Unis, du Royaume-Uni et d’Allemagne.',
      figure: 'infante-riu',
    },
    {
      agent: 'IAD Portugal',
      client: 'Justina Tarvainyte',
      en: 'Kyero is an International portal we will continue to invest more in. We are winning with Kyero. The performance outweighs the cost.',
      es: 'Kyero es un portal internacional en el que seguiremos invirtiendo. Salimos ganando con Kyero. El rendimiento supera el coste.',
      pt: 'Kyero é um portal internacional em que continuaremos a investir mais. Estamos a ganhar com a Kyero O desempenho supera o custo.',
      it: 'Kyero è un portale internazionale su cui continueremo a investire di più. Con Kyero, stiamo vincendo. Le prestazioni superano il costo.',
      fr: 'Kyero est une plateforme internationale sur laquelle nous continuerons d’investir. Notre partenariat avec Kyero est un réel succès. Et les performances surpassent largement les coûts associés.',
      figure: 'iad-portugal',
    },
  ],
  france: [
    {
      agent: 'La Résidence - The French Property People',
      client: 'Rebbeca Hilton',
      en: 'Kyero has to be, without doubt, the friendliest team to work with. Extremely responsive, always helpful and this approach obviously also extends to the experience our clients, on the other side of the portal, are receiving as we’re getting a steady stream of good quality leads.',
      es: 'Kyero es, sin duda, el equipo más agradable con el que trabajar. Son muy atentos, siempre están dispuestos a ayudar y, obviamente, este enfoque también se refleja en la experiencia que reciben nuestros clientes, al otro lado del portal, ya que recibimos un flujo constante de clientes potenciales de buena calidad.',
      pt: "A Kyero tem de ser, indiscutivelmente, a equipa mais simpática para trabalhar. Extremamente recetiva, sempre prestável e, como é evidente, esta abordagem também se estende à experiência obtida pelos nossos clientes, do outro lado do portal, porque estamos a receber um fluxo constante de 'leads' de boa qualidade.",
      it: "Kyero deve essere, senza dubbio, la squadra più amichevole con cui lavorare. Estremamente reattiva, sempre disponibile e questo approccio ovviamente si estende anche all'esperienza che i nostri clienti, dall'altra parte del portale, stanno ricevendo poiché riceviamo un flusso costante di lead di buona qualità.",
      fr: "Kyero doit être, sans aucun doute, l'équipe la plus amicale avec laquelle travailler. Extrêmement réactif, toujours utile et cette approche s'étend évidemment également à l'expérience que nos clients de l'autre côté du portail reçoivent, car nous obtenons un flux constant de prospects de bonne qualité.",
      figure: 'la-residence',
    },
    {
      agent: 'SAFTI',
      client: 'Daniela Weiss',
      en: 'We chose Kyero, at first for a trial run to see how many leads we would get. It worked so well that we decided to come on board. We are very happy.',
      es: 'Al principio elegimos Kyero como prueba para ver cuántos clientes potenciales obtendríamos. Funcionó tan bien que decidimos sumarnos. Estamos muy contentos',
      pt: "Inicialmente, escolhemos a Kyero como um teste para vermos quantos 'leads' conseguiríamos. Correu tão bem que decidimos aderir. Estamos muito satisfeitos",
      it: 'Abbiamo scelto Kyero inizialmente per una prova e per vedere quanti lead avremmo ottenuto. Ha funzionato così bene che abbiamo deciso di salire a bordo. Ne siamo molto felici.',
      fr: 'Après avoir fait nos recherches pour savoir où nous aimerions faire de la publicité, nous avons choisi Kyero. Cela a si bien fonctionné que nous avons décidé de monter à bord. Nous sommes très satisfaits.',
      figure: 'safti',
    },
    {
      agent: 'Home Hunts SARL',
      client: 'Tim Swannie',
      en: 'Kyero have helped us to attract a range of international clients who we previously didn’t have access to, we are impressed with the quality of the leads we receive and the support they offer.',
      es: 'Kyero nos ha ayudado a atraer a una serie de clientes internacionales a los que antes no teníamos acceso. Nos impresiona la calidad de los contactos que recibimos y el apoyo que nos ofrecen.',
      pt: "A Kyero ajudou-nos a atrair uma série de clientes internacionais aos quais não tínhamos acesso anteriormente, estamos impressionados com a qualidade dos 'leads' que recebemos e o apoio que oferecem.",
      it: 'Kyero ci ha aiutato ad attrarre una serie di clienti internazionali a cui in precedenza non avevamo accesso, siamo rimasti colpiti dalla qualità delle lead che riceviamo e dal supporto che offrono.',
      fr: "Kyero nous a aidés à attirer une gamme de clients internationaux auxquels nous n'avions pas accès auparavant, nous sommes impressionnés par la qualité des prospects que nous recevons et le soutien qu'ils offrent.",
      figure: 'home-hunts-sarl',
    },
  ],
  italy: [
    {
      agent: 'My Project Casa',
      en: "This real estate portal is serious, transparent and it is commited to meeting customers' needs.",
      es: 'Este portal inmobiliario es serio, transparente y se compromete a satisfacer las necesidades de los clientes.',
      pt: 'Este portal imobiliário é sério, transparente e tem o compromisso de satisfazer as necessidades dos clientes.',
      it: 'Portale immobiliare serio, trasparente e si impegna nel rispondere alle esigenze dei propri clienti',
      fr: 'Ce portail immobilier se distingue par son sérieux, sa transparence et son engagement envers la satisfaction des clients.',
      figure: 'my-project-casa',
    },
    {
      agent: 'Trulli&Dimore',
      en: 'Our experience with Kyero is very positive. We have always been very well guided and well looked after: from the promotion of our properties to the support. Definitely a good portal that we recommend.',
      es: 'Nuestra experiencia con Kyero ha sido muy positiva. Siempre se nos ha orientado muy bien y hemos sido bien atendidos: desde la promoción de nuestras propiedades hasta la atención al cliente. Definitivamente es un buen portal que recomendamos.',
      pt: 'A nossa experiência com o Kyero é muito positiva. Fomos sempre muito bem orientados e bem tratados: desde a promoção dos imóveis ao apoio. É, definitivamente, um bom portal que recomendamos.',
      it: "La nostra esperienza con Kyero è molto positiva.Ci siamo sempre sentiti guidati e trovati benissimo: dalla promozione delle nostre proprietà all'assistenza. Sicuramente un valido portale che raccomandiamo",
      fr: 'Notre expérience avec Kyero est très positive. Nous avons toujours été très bien accompagnés et pris en charge : de la promotion de nos propriétés à l’assistance. C’est assurément un bon portail que nous recommandons.',
      figure: 'trulli-dimore',
    },
    {
      agent: 'Toscana One Srl',
      en: 'For us Kyero was a great discovery, it started working right away. Prime is a great improvement for us and we look forward with optimism. Happy to have you by our side.',
      es: 'Kyero ha sido un gran descubrimiento para nosotros. Empezó a funcionar enseguida. Prime es una gran mejora para nosotros y miramos al futuro con optimismo. Nos encanta tenerte a nuestro lado.',
      pt: "Para nós, o Kyero foi uma grande descoberta, começou a funcionar de imediato. O 'Prime' é uma grande melhoria para nós e encaramos o futuro com otimismo. Estamos felizes por te termos ao nosso lado.",
      it: 'Per noi Kyero è stata una grande scoperta, ha iniziato a funzionare da subito. Prime è un grande miglioramento per noi e guardiamo avanti con ottimismo. Siamo felici di avervi al nostro fianco.',
      fr: 'Kyero a été pour nous une trouvaille majeure, ayant démontré son efficacité dès le départ. Prime représente une nette amélioration et nous abordons l’avenir avec confiance. Nous sommes heureux de notre collaboration !',
      figure: 'toscana-one',
    },
  ],
  default: [
    {
      agent: 'CG Real Estate',
      client: 'Christian Alexander',
      en: 'We have been working very closely with Kyero since 2005, their reach, marketing and online positioning helping us to get our properties out to all potential buyers is unrivalled.',
      es: 'Llevamos trabajando muy estrechamente con Kyero desde 2005, su alcance, marketing y posicionamiento online no tiene rival.',
      pt: "Temos trabalhado em estreita colaboração com o Kyero desde 2005, o seu alcance, 'marketing' e posicionamento 'online, que nos ajuda a levar as nossas propriedades a todos os potenciais compradores, é incomparável.",
      it: 'Lavoriamo a stretto contatto con Kyero dal 2005: la loro portata, il marketing e il posizionamento online ci aiutano a far conoscere le nostre proprietà a tutti i potenziali acquirenti non hanno rivali.',
      fr: 'Depuis 2005, nous avons établi une étroite collaboration avec Kyero. Leur portée, leur stratégie marketing et leur positionnement en ligne ont contribué à accroître notre visibilité auprès de tous les acheteurs potentiels pour nos propriétés.',
      figure: 'cg-real-estate',
    },
    {
      agent: 'Desea Homes',
      client: 'Raphael',
      en: 'Kyero Prime gave us visibility and reach that no other property portal has ever given us. In addition, its commercial and technical team is always available for anything you need.',
      es: 'Kyero Prime nos da una visibilidad y el alcance que ningún otro portal inmobiliario nos ha dado. Además, su equipo comercial y técnico está siempre disponible para lo que necesites.',
      pt: 'O Kyero Prime deu-nos a visibilidade e o alcance que nenhum outro portal imobiliário alguma vez nos deu. Além disso, a sua equipa comercial e técnica está sempre disponível para tudo o que precisares.',
      it: 'Kyero Prime ci ha dato visibilità e portata che nessun altro portale immobiliare ci ha mai dato. Inoltre, il suo team commerciale e tecnico è sempre disponibile per qualsiasi esigenza.',
      fr: 'Kyero Prime a révolutionné notre notoriété et notre envergure, surpassant toute autre plateforme immobilière. De plus, leur équipe commerciale et technique est toujours prête à répondre à nos besoins de manière proactive.',
      figure: 'desea-homes',
    },
    {
      agent: 'Infante & Riu',
      client: 'Adelaide Durão',
      en: 'Kyero is already part of our Top 3 international sites with the leads from Prime and having closed 5 deals this year! 96% of leads are from abroad, mainly from the US, UK and Germany.',
      es: 'Kyero ya forma parte de nuestros 3 mejores sitios internacionales, junto con los clientes potenciales de Prime, ¡y ha cerrado 5 operaciones este año! El 96 % de los clientes potenciales proceden del extranjero, principalmente de EE. UU., Reino Unido y Alemania.',
      pt: 'A Kyero já faz parte do Top 3 sites internacionais com as leads do Prime e fechei 5 negócios este ano! 96% das leads são do estrangeiro, principalmente dos EUA, Reino-Unido e Alemanha.',
      it: "Kyero fa già parte dei nostri primi 3 siti internazionali con le lead di Prime e avendo chiuso 5 affari quest'anno! Il 96% dei contatti proviene dall'estero, principalmente da Stati Uniti, Regno Unito e Germania.",
      fr: 'Kyero occupe déjà une place de choix parmi les Top 3 des sites internationaux, grâce aux leads générés par Prime qui ont conduit à la concrétisation de cinq transactions cette année. 96 % des leads proviennent de l’étranger, en particulier des États-Unis, du Royaume-Uni et d’Allemagne.',
      figure: 'infante-riu',
    },
  ],
};
