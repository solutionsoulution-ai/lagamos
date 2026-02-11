
export const LOAN_DATABASE: any = {
  fr: {
    personnel: {
      title: "Prêt Personnel",
      description: "Concrétisez vos projets de vie librement.",
      longDescription: "Mariage, voyages, études ou imprévus, disposez des fonds dont vous avez besoin rapidement.",
      features: ["2% Fixe", "Sans justificatifs", "Virement express"],
      maxAmount: 75000,
      maxDuration: 84,
      definition: {
        title: "Qu'est-ce que le Prêt Personnel ?",
        text: "Le prêt personnel est un crédit à la consommation non affecté. Contrairement à un crédit auto ou travaux, vous n'avez pas besoin de fournir de justificatif d'achat pour utiliser les fonds. C'est la solution idéale pour financer un besoin de trésorerie, un voyage, un mariage ou tout autre projet personnel.",
        characteristics: [
          { label: "Type", value: "Non affecté" },
          { label: "Taux (TAEG)", value: "2% Fixe" },
          { label: "Montant Max", value: "75 000 €" },
          { label: "Durée", value: "6 à 84 mois" }
        ]
      },
      faqs: [
        { q: "Pourquoi choisir le prêt personnel Europfy ?", a: "Pour sa simplicité : un taux unique de 2% et une utilisation libre des fonds." },
        { q: "À quel moment dois-je régler les frais de dossier ?", a: "Uniquement après l'étude et l'acceptation définitive de votre dossier par nos analystes." },
        { q: "Le taux de 2% est-il accessible sans justificatif de projet ?", a: "Oui, c'est un prêt non affecté. Vous utilisez la somme à 2% comme vous le souhaitez." },
        { q: "Y a-t-il des frais cachés ?", a: "Non. Le taux est de 2% et les frais de dossier sont annoncés clairement lors de l'acceptation." },
        { q: "Puis-je emprunter une petite somme à 2% ?", a: "Oui, notre taux de 2% s'applique dès les premiers paliers d'emprunt." },
        { q: "Le taux est-il plus élevé pour les durées longues ?", a: "Non, la durée n'impacte pas le taux : il reste à 2% chez Europfy." },
        { q: "Puis-je rembourser par anticipation ?", a: "Oui, conformément à la loi, avec l'avantage d'avoir eu un coût initial très bas à 2%." }
      ],
      testimonials: [
        { id: 101, name: "Claire Dupont", role: "Enseignante", content: "J'ai pu financer le mariage de ma fille sans toucher à mon épargne. Rapide et efficace.", rating: 5, avatar: "https://i.pravatar.cc/150?u=claire" },
        { id: 102, name: "Marc Leroy", role: "Ingénieur", content: "Pas de questions intrusives sur l'utilisation des fonds. Le taux à 2% est réel.", rating: 5, avatar: "https://i.pravatar.cc/150?u=marc" }
      ]
    },
    immobilier: {
      title: "Prêt Immobilier",
      description: "Taux fixe de 2% pour votre futur chez-vous.",
      longDescription: "Financez l'acquisition de votre résidence principale, secondaire ou votre investissement locatif en toute sérénité.",
      features: ["2% Fixe", "Assurance flexible", "Réponse en 24h"],
      maxAmount: 1500000,
      maxDuration: 300,
      definition: {
        title: "Comprendre le Prêt Immobilier",
        text: "Le prêt immobilier est destiné à financer l'acquisition d'un bien immobilier (maison, appartement, terrain) ou des travaux de rénovation importants. Chez Europfy, nous simplifions l'accès à la propriété avec un taux fixe exceptionnellement bas, garanti sur toute la durée.",
        characteristics: [
          { label: "Objet", value: "Achat / Travaux" },
          { label: "Taux (TAEG)", value: "2% Fixe" },
          { label: "Montant Max", value: "1 500 000 €" },
          { label: "Durée Max", value: "25 ans (300 mois)" }
        ]
      },
      faqs: [
        { q: "Quel est le taux pour un achat immobilier ?", a: "Chez Europfy, nous appliquons un taux fixe unique de 2% sur toute la durée de votre crédit." },
        { q: "Les frais de notaire sont-ils inclus dans le prêt ?", a: "Non, Europfy ne finance pas les frais de notaire. Ceux-ci doivent être réglés par l'emprunteur." },
        { q: "Quand dois-je payer les frais de dossier ?", a: "Les frais de dossier sont dûs uniquement si votre demande de prêt est acceptée et validée par nos services." },
        { q: "Le taux de 2% est-il garanti ?", a: "Oui, c'est un taux fixe contractuel qui ne varie pas, peu importe l'évolution des taux du marché." },
        { q: "Quelle est la durée maximale pour ce taux de 2% ?", a: "Vous pouvez emprunter jusqu'à 25 ans tout en bénéficiant de notre taux préférentiel." },
        { q: "Puis-je moduler mes mensualités ?", a: "Oui, nos contrats à 2% permettent une flexibilité pour augmenter ou réduire vos paiements." },
        { q: "Quels justificatifs sont nécessaires ?", a: "Votre dossier doit inclure vos justificatifs de revenus, d'identité et le compromis de vente (hors frais de notaire)." }
      ],
      testimonials: [
        { id: 201, name: "Thomas V.", role: "Propriétaire", content: "Devenir propriétaire à ce taux semblait impossible. Europfy l'a fait.", rating: 5, avatar: "https://i.pravatar.cc/150?u=thomas" },
        { id: 202, name: "Sarah & Paul", role: "Jeunes mariés", content: "Notre premier achat s'est déroulé sans stress grâce à l'accompagnement.", rating: 4, avatar: "https://i.pravatar.cc/150?u=sarah" }
      ]
    },
    automobile: {
      title: "Prêt Auto",
      description: "Financez votre mobilité au meilleur prix.",
      longDescription: "Que ce soit pour une voiture neuve, d'occasion ou électrique, profitez d'un financement avantageux.",
      features: ["2% Fixe", "Sans apport obligatoire", "Tous types de véhicules"],
      maxAmount: 80000,
      maxDuration: 84,
      definition: {
        title: "Qu'est-ce que le Crédit Auto ?",
        text: "Le crédit auto est un prêt affecté, c'est-à-dire lié exclusivement à l'achat d'un véhicule (voiture, moto, camping-car). Que le véhicule soit neuf ou d'occasion, Europfy finance jusqu'à 100% de sa valeur sans exiger d'apport personnel.",
        characteristics: [
          { label: "Type", value: "Affecté (Justificatif requis)" },
          { label: "Taux (TAEG)", value: "2% Fixe" },
          { label: "Véhicules", value: "Neuf & Occasion" },
          { label: "Apport", value: "Non obligatoire" }
        ]
      },
      faqs: [
        { q: "Quel taux s'applique pour un véhicule neuf ou d'occasion ?", a: "Le taux est identique pour tous : 2% fixe." },
        { q: "Financez-vous la totalité du prix du véhicule ?", a: "Oui, nous finançons 100% de la valeur du véhicule, mais les frais de dossier restent à votre charge après acceptation." },
        { q: "Quand intervient le paiement des frais de dossier ?", a: "Ils sont facturés une fois que votre prêt auto est officiellement accordé." },
        { q: "Puis-je acheter un véhicule à un particulier à 2% ?", a: "Oui, le taux de 2% s'applique que le vendeur soit un professionnel ou un particulier." },
        { q: "Le taux de 2% change-t-il selon la durée ?", a: "Non, que vous remboursiez sur 12 ou 84 mois, le taux reste bloqué à 2%." },
        { q: "Peut-on inclure l'immatriculation dans le prêt ?", a: "Non, le prêt couvre le véhicule. Les frais annexes (carte grise, dossier) sont à régler séparément." },
        { q: "Quel est le délai de déblocage des fonds ?", a: "Une fois le dossier accepté et les frais de dossier réglés, les fonds sont versés sous 7 à 14 jours." }
      ],
      testimonials: [
        { id: 301, name: "Karim B.", role: "Chauffeur VTC", content: "J'ai pu changer mon véhicule pro rapidement. Le taux est incroyable.", rating: 5, avatar: "https://i.pravatar.cc/150?u=karim" },
        { id: 302, name: "Élise M.", role: "Étudiante", content: "Ma première voiture financée sans pression. Merci !", rating: 5, avatar: "https://i.pravatar.cc/150?u=elise" }
      ]
    },
    entreprise: {
      title: "Prêt Entreprise",
      description: "Soutenez la croissance de votre activité.",
      longDescription: "Besoins de trésorerie, investissement matériel ou développement commercial, nous finançons vos ambitions.",
      features: ["2% Fixe", "Analyse humaine experte", "Différé de paiement"],
      maxAmount: 5000000,
      maxDuration: 120,
      definition: {
        title: "Le Prêt Professionnel Europfy",
        text: "Destiné aux artisans, commerçants, PME et grandes entreprises, ce prêt vise à financer les besoins liés à l'activité professionnelle : achat de matériel, travaux, besoin en fonds de roulement ou développement commercial. Une offre rare pour soutenir l'économie réelle.",
        characteristics: [
          { label: "Bénéficiaires", value: "Toutes entreprises" },
          { label: "Taux (TAEG)", value: "2% Fixe" },
          { label: "Plafond", value: "5 000 000 €" },
          { label: "Flexibilité", value: "Différé possible" }
        ]
      },
      faqs: [
        { q: "Le taux de 2% est-il le même pour toutes les entreprises ?", a: "Oui, de la start-up à la PME, Europfy propose un taux unique de 2% pour tous les pros." },
        { q: "Les frais de dossier sont-ils fixes ?", a: "Ils sont calculés selon l'ampleur du projet et payables dès l'acceptation finale du financement." },
        { q: "Puis-je financer des locaux professionnels sans les frais de notaire ?", a: "Exactement. Nous finançons les murs à 2%, mais les frais de notaire sont à votre charge." },
        { q: "Peut-on financer du matériel d'occasion à 2% ?", a: "Oui, notre taux unique de 2% s'applique à tout type d'investissement professionnel." },
        { q: "Faut-il un apport personnel ?", a: "L'apport n'est pas obligatoire, mais vous devez être en mesure de couvrir les frais annexes et de dossier." },
        { q: "Quel est l'avantage du taux Europfy pour un pro ?", a: "Un coût du crédit extrêmement bas (2%) qui préserve votre capacité d'autofinancement." },
        { q: "Le taux de 2% s'applique-t-il au besoin de trésorerie ?", a: "Oui, toutes nos solutions de financement professionnel sont au taux fixe de 2%." }
      ],
      testimonials: [
        { id: 401, name: "Stéphane R.", role: "Restaurateur", content: "J'ai rénové ma cuisine grâce à ce prêt. Dossier simple et rapide.", rating: 5, avatar: "https://i.pravatar.cc/150?u=stephane" },
        { id: 402, name: "Julie T.", role: "CEO Start-up", content: "Une bouffée d'oxygène pour ma trésorerie. Partenaire de confiance.", rating: 5, avatar: "https://i.pravatar.cc/150?u=julie" }
      ]
    },
    rachat: {
      title: "Rachat de Crédit",
      description: "Simplifiez vos finances et réduisez vos mensualités.",
      longDescription: "Regroupez tous vos crédits en un seul pour ne payer qu'une seule mensualité à taux réduit de 2%.",
      features: ["2% Fixe", "Une seule mensualité", "Gestion simplifiée"],
      maxAmount: 250000,
      maxDuration: 180,
      definition: {
        title: "Comprendre le Regroupement de Crédits",
        text: "Le rachat de crédit (ou regroupement) consiste à fusionner plusieurs prêts existants (immo, conso, revolving) en un seul contrat. L'objectif est de réduire votre mensualité globale en allongeant la durée de remboursement et en profitant de notre taux exceptionnel de 2%.",
        characteristics: [
          { label: "Objectif", value: "Baisse des mensualités" },
          { label: "Nouveau Taux", value: "2% Fixe" },
          { label: "Gestion", value: "Prélèvement unique" },
          { label: "Inclus", value: "Trésorerie possible" }
        ]
      },
      faqs: [
        { q: "Quel est l'intérêt de racheter ses crédits chez Europfy ?", a: "Vous regroupez vos dettes actuelles sous un seul contrat au taux unique de 2%." },
        { q: "Puis-je inclure un prêt immobilier dans le rachat ?", a: "Oui, mais attention : le rachat ne couvrira pas les nouveaux frais de notaire éventuels." },
        { q: "Comment sont gérés les frais de dossier pour un rachat ?", a: "Comme pour nos autres prêts, ils sont dûs après acceptation de l'opération de regroupement." },
        { q: "Le taux de 2% s'applique-t-il à la trésorerie supplémentaire ?", a: "Oui, si vous demandez une somme en plus lors du rachat, elle est aussi à 2%." },
        { q: "Réduit-on réellement les mensualités à 2% ?", a: "Oui, le taux de 2% est souvent bien inférieur aux taux des crédits renouvelables ou anciens prêts." },
        { q: "Le rachat à 2% concerne-t-il aussi les dettes fiscales ?", a: "Oui, nous pouvons intégrer diverses dettes dans le regroupement au taux de 2%." },
        { q: "Quelles sont les étapes ?", a: "Simulation, analyse, acceptation, paiement des frais de dossier, puis remboursement de vos anciens créanciers." }
      ],
      testimonials: [
        { id: 501, name: "Michel D.", role: "Retraité", content: "Mes mensualités ont baissé de 40%. Je respire enfin.", rating: 5, avatar: "https://i.pravatar.cc/150?u=michel" },
        { id: 502, name: "Valérie K.", role: "Employée de banque", content: "Même en connaissant le système, cette offre à 2% est imbattable.", rating: 5, avatar: "https://i.pravatar.cc/150?u=valerie" }
      ]
    }
  }
};
