interface Translation {
  en: string
  es: string
  fr: string
  jp: string
  ko: string
  'pt-BR': string
}

interface TraitTitle {
  title: Translation
  description: Translation
}

interface TraitType {
  title: Translation
  abbreviation: string
  description: Translation
}

interface MBTITexts {
  titles: {
    energy: TraitTitle
    mind: TraitTitle
    nature: TraitTitle
    tactics: TraitTitle
    identity: TraitTitle
  }
  types: {
    introverted: TraitType
    extroverted: TraitType
    observant: TraitType
    intuitive: TraitType
    thinking: TraitType
    feeling: TraitType
    judging: TraitType
    prospecting: TraitType
    assertive: TraitType
    turbulent: TraitType
  }
  pairs: Record<string, string>
  display: Record<string, string>
}

const texts: MBTITexts = {
  titles: {
    energy: {
      title: {
        en: "Energy",
        es: "Energía",
        fr: "Énergie",
        jp: "エネルギー",
        ko: "에너지",
        "pt-BR": "Energia",
      },
      description: {
        en: "Energy determines how you interact with the external world, either through actions or reflections. Energy is divided into two aspects: extraversion and introversion. Extraversion is the tendency to focus on the outer world, while introversion is the tendency to focus on the inner world.",
        es: "La energía determina cómo interactúas con el mundo exterior, ya sea a través de acciones o reflexiones. La energía se divide en dos aspectos: extraversión e introversión. La extraversión es la tendencia a enfocarse en el mundo exterior, mientras que la introversión es la tendencia a enfocarse en el mundo interior.",
        fr: "L'énergie détermine comment vous interagissez avec le monde extérieur, que ce soit par des actions ou des réflexions. L'énergie est divisée en deux aspects : l'extraversion et l'introversion. L'extraversion est la tendance à se concentrer sur le monde extérieur, tandis que l'introversion est la tendance à se concentrer sur le monde intérieur.",
        jp: "エネルギーは、行動または思索を通じて外界とどのように相互作用するかを決定します。エネルギーは外向性と内向性の2つの側面に分かれています。外向性は外界に焦点を当てる傾向であり、内向性は内面の世界に焦点を当てる傾向です。",
        ko: "에너지는 행동 또는 반성을 통해 외부 세계와 상호 작용하는 방식을 결정합니다. 에너지는 외향성과 내향성 두 가지 측면으로 나뉩니다. 외향성은 외부 세계에 초점을 맞추는 경향이 있는 반면 내향성은 내면 세계에 초점을 맞추는 경향이 있습니다.",
        "pt-BR":
          "A energia é a característica que determina como você interage com o mundo exterior, seja por meio de ações ou reflexões. A energia é dividida em dois aspectos: extroversão e introversão. A extroversão é a tendência a se concentrar no mundo exterior, enquanto a introversão é a tendência a se concentrar no mundo interior.",
      },
    },
    mind: {
      title: {
        en: "Mind",
        es: "Mente",
        fr: "Esprit",
        jp: "心",
        ko: "마음",
        "pt-BR": "Mente",
      },
      description: {
        en: "Mind determines how you make decisions and process information. It is divided into two aspects: observation and intuition. Observation focuses on concrete information, while intuition focuses on abstract information and future possibilities.",
        es: "La mente determina cómo tomas decisiones y procesas información. Se divide en dos aspectos: observación e intuición. La observación se centra en información concreta, mientras que la intuición se centra en información abstracta y en las posibilidades futuras.",
        fr: "L'esprit détermine comment vous prenez des décisions et traitez l'information. Il est divisé en deux aspects : l'observation et l'intuition. L'observation se concentre sur des informations concrètes, tandis que l'intuition se concentre sur des informations abstraites et les possibilités futures.",
        jp: "心は意思決定と情報処理の方法を決定します。それは観察と直感の2つの側面に分かれています。観察は具体的な情報に焦点を当て、直感は抽象的な情報と未来の可能性に焦点を当てます。",
        ko: "마음은 의사 결정을 내리고 정보를 처리하는 방식을 결정합니다. 관찰과 직관 두 가지 측면으로 나뉩니다. 관찰은 구체적인 정보에 중점을 두고 직관은 추상적인 정보와 미래 가능성에 중점을 둡니다.",
        "pt-BR":
          "A mente é a característica que determina como você toma decisões e lida com informações. A mente é dividida em dois aspectos: observação e intuição. A observação é a tendência a se concentrar em informações concretas e no que pode ser visto, ouvido, sentido ou experimentado. A intuição é a tendência a se concentrar em informações abstratas e nas possibilidades futuras.",
      },
    },
    nature: {
      title: {
        en: "Nature",
        es: "Naturaleza",
        fr: "Nature",
        jp: "性質",
        ko: "성질",
        "pt-BR": "Natureza",
      },
      description: {
        en: "Nature determines how you deal with emotions and stressful situations. It is divided into two aspects: feeling and thinking. Feeling focuses on emotions and personal values, while thinking focuses on logic and reason.",
        es: "La naturaleza determina cómo manejas las emociones y las situaciones estresantes. Se divide en dos aspectos: sentimiento y pensamiento. El sentimiento se centra en las emociones y los valores personales, mientras que el pensamiento se centra en la lógica y la razón.",
        fr: "La nature détermine comment vous gérez les émotions et les situations stressantes. Elle est divisée en deux aspects : sentiment et pensée. Le sentiment se concentre sur les émotions et les valeurs personnelles, tandis que la pensée se concentre sur la logique et la raison.",
        jp: "性質は、感情やストレスの多い状況に対処する方法を決定します。それは感情と思考の2つの側面に分かれています。感情は感情と個人的な価値観に焦点を当て、思考は論理と理由に焦点を当てます。",
        ko: "성질은 감정과 스트레스 상황을 처리하는 방식을 결정합니다. 감정과 사고 두 가지 측면으로 나뉩니다. 감정은 감정과 개인적 가치를 중점으로 하고 사고는 논리와 이성에 중점을 둡니다.",
        "pt-BR":
          "A natureza é a característica que determina como você lida com emoções e situações estressantes. A natureza é dividida em dois aspectos: sentimento e pensamento. O sentimento é a tendência a tomar decisões com base em emoções e valores pessoais. O pensamento é a tendência a tomar decisões com base na lógica e na razão.",
      },
    },
    tactics: {
      title: {
        en: "Tactics",
        es: "Tácticas",
        fr: "Tactiques",
        jp: "戦術",
        ko: "전술",
        "pt-BR": "Tática",
      },
      description: {
        en: "Tactics determine how you handle planning and decision-making. They are divided into two aspects: judging and prospecting. Judging focuses on results and following a plan, while prospecting focuses on possibilities and keeping options open.",
        es: "Las tácticas determinan cómo manejas la planificación y la toma de decisiones. Se dividen en dos aspectos: juicio y prospección. El juicio se centra en los resultados y en seguir un plan, mientras que la prospección se centra en las posibilidades y en mantener abiertas las opciones.",
        fr: "Les tactiques déterminent comment vous gérez la planification et la prise de décision. Elles sont divisées en deux aspects : le jugement et la prospection. Le jugement se concentre sur les résultats et le suivi d'un plan, tandis que la prospection se concentre sur les possibilités et le maintien des options ouvertes.",
        jp: "戦術は、計画や意思決定を処理する方法を決定します。それは判断と探索の2つの側面に分かれています。判断は結果と計画の遵守に焦点を当て、探索は可能性と選択肢を開いたままにすることに焦点を当てます。",
        ko: "전술은 계획 및 의사 결정 처리 방식을 결정합니다. 판단과 탐색 두 가지 측면으로 나뉩니다. 판단은 결과와 계획 준수에 중점을 두고 탐색은 가능성과 옵션을 열어두는 데 중점을 둡니다.",
        "pt-BR":
          "As táticas são a característica que determina como você lida com planejamento e tomada de decisões. As táticas são divididas em dois aspectos: julgamento e prospecção. O julgamento é a tendência a se concentrar em resultados e em seguir um plano. Prospecção é a tendência a se concentrar em possibilidades e em manter as opções em aberto.",
      },
    },
    identity: {
      title: {
        en: "Identity",
        es: "Identidad",
        fr: "Identité",
        jp: "アイデンティティ",
        ko: "정체성",
        "pt-BR": "Identidade",
      },
      description: {
        en: "Identity determines how you handle confidence, self-esteem, and determination. It is divided into two aspects: assertiveness and turbulence. Assertiveness focuses on confidence and taking control of situations, while turbulence focuses on anxiety and concern for the future.",
        es: "La identidad determina cómo manejas la confianza, la autoestima y la determinación. Se divide en dos aspectos: asertividad y turbulencia. La asertividad se centra en la confianza y en tomar el control de las situaciones, mientras que la turbulencia se centra en la ansiedad y la preocupación por el futuro.",
        fr: "L'identité détermine comment vous gérez la confiance, l'estime de soi et la détermination. Elle est divisée en deux aspects : l'assertivité et la turbulence. L'assertivité se concentre sur la confiance et la prise de contrôle des situations, tandis que la turbulence se concentre sur l'anxiété et les préoccupations pour l'avenir.",
        jp: "アイデンティティは、自信、自尊心、決定力をどのように扱うかを決定します。それは、アサーティブとタービュラントの2つの側面に分かれています。アサーティブは自信と状況を支配することに焦点を当て、タービュラントは不安と将来への懸念に焦点を当てます。",
        ko: "정체성은 자신감, 자존감, 결단력을 처리하는 방식을 결정합니다. 단호함과 격변 두 가지 측면으로 나뉩니다. 단호함은 자신감과 상황 통제에 중점을 두고 격변은 불안과 미래에 대한 걱정에 중점을 둡니다.",
        "pt-BR":
          "A identidade é a característica que determina como você lida com a confiança, a autoestima e a determinação. A identidade é dividida em dois aspectos: assertividade e turbulência. A assertividade é a tendência a se sentir confiante e a assumir o controle de uma situação. A turbulência é a tendência a se sentir ansioso e a se preocupar com o futuro.",
      },
    },
  },
  types: {
    introverted: {
      title: {
        en: "Introverted",
        es: "Introvertido",
        fr: "Introverti",
        jp: "内向的",
        ko: "내향적",
        "pt-BR": "Introvertido",
      },
      abbreviation: "I",
      description: {
        en: "Introverts tend to be more reserved and focus on their inner world. They prefer solitary activities or small groups and may feel overwhelmed in social settings.",
        es: "Los introvertidos tienden a ser más reservados y a centrarse en su mundo interior. Prefieren actividades solitarias o en pequeños grupos y pueden sentirse abrumados en entornos sociales.",
        fr: "Les introvertis ont tendance à être plus réservés et à se concentrer sur leur monde intérieur. Ils préfèrent des activités solitaires ou en petits groupes et peuvent se sentir dépassés dans des environnements sociaux.",
        jp: "内向的な人は、より控えめで、自分の内面の世界に焦点を当てる傾向があります。彼らは一人での活動や小さなグループを好み、社会的な場面では圧倒されることがあります。",
        ko: "내향적인 사람들은 더 신중하고 내면의 세계에 집중하는 경향이 있습니다. 그들은 혼자 또는 소규모 그룹 활동을 선호하며 사회적 환경에서 부담감을 느낄 수 있습니다.",
        "pt-BR":
          "Os introvertidos tendem a ser mais reservados e a se concentrar em seu mundo interior. Eles preferem atividades solitárias ou em pequenos grupos e podem se sentir sobrecarregados em ambientes sociais.",
      },
    },
    extroverted: {
      title: {
        en: "Extroverted",
        es: "Extrovertido",
        fr: "Extraverti",
        jp: "外向的",
        ko: "외향적",
        "pt-BR": "Extrovertido",
      },
      abbreviation: "E",
      description: {
        en: "Extroverts tend to be more social and focus on the outer world. They enjoy group activities and may feel bored or lonely when alone.",
        es: "Los extrovertidos tienden a ser más sociables y a centrarse en el mundo exterior. Disfrutan de actividades en grupo y pueden sentirse aburridos o solos cuando están solos.",
        fr: "Les extravertis ont tendance à être plus sociaux et à se concentrer sur le monde extérieur. Ils apprécient les activités de groupe et peuvent s'ennuyer ou se sentir seuls lorsqu'ils sont seuls.",
        jp: "外向的な人は、より社交的で外界に焦点を当てる傾向があります。彼らはグループ活動を楽しみ、一人では退屈したり孤独を感じることがあります。",
        ko: "외향적인 사람들은 더 사교적이고 외부 세계에 집중하는 경향이 있습니다. 그들은 그룹 활동을 즐기고 혼자 있을 때 지루하거나 외로움을 느낄 수 있습니다.",
        "pt-BR":
          "Os extrovertidos tendem a ser mais sociáveis e a se concentrar no mundo exterior. Eles preferem atividades em grupo e podem se sentir entediados ou solitários quando estão sozinhos.",
      },
    },
    observant: {
      title: {
        en: "Observant",
        es: "Observador",
        fr: "Observateur",
        jp: "観察的",
        ko: "관찰형",
        "pt-BR": "Observador",
      },
      abbreviation: "S",
      description: {
        en: "Observers tend to be more practical and focus on concrete details. They prefer objective and reliable information and may struggle with uncertainty.",
        es: "Los observadores tienden a ser más prácticos y a centrarse en detalles concretos. Prefieren información objetiva y confiable, y pueden tener dificultades con la incertidumbre.",
        fr: "Les observateurs ont tendance à être plus pratiques et à se concentrer sur les détails concrets. Ils préfèrent les informations objectives et fiables et peuvent avoir du mal à gérer l'incertitude.",
        jp: "観察者は、より実際的で具体的な詳細に焦点を当てる傾向があります。彼らは客観的で信頼できる情報を好み、不確実性に苦労することがあります。",
        ko: "관찰자는 더 실용적이고 구체적인 세부 사항에 집중하는 경향이 있습니다. 그들은 객관적이고 신뢰할 수 있는 정보를 선호하며 불확실성에 어려움을 겪을 수 있습니다.",
        "pt-BR":
          "Os observadores tendem a ser mais práticos e a se concentrar em detalhes concretos. Eles preferem informações objetivas e confiáveis e podem ter dificuldade em lidar com incertezas ou ambiguidades.",
      },
    },
    intuitive: {
      title: {
        en: "Intuitive",
        es: "Intuitivo",
        fr: "Intuitif",
        jp: "直感的",
        ko: "직관형",
        "pt-BR": "Intuitivo",
      },
      abbreviation: "N",
      description: {
        en: "Intuitives tend to be more imaginative and focus on future possibilities. They prefer abstract and theoretical information and may struggle with concrete facts.",
        es: "Los intuitivos tienden a ser más imaginativos y a centrarse en posibilidades futuras. Prefieren información abstracta y teórica y pueden tener dificultades con hechos concretos.",
        fr: "Les intuitifs ont tendance à être plus imaginatifs et à se concentrer sur les possibilités futures. Ils préfèrent les informations abstraites et théoriques et peuvent avoir du mal avec les faits concrets.",
        jp: "直感的な人は、より想像力があり、将来の可能性に焦点を当てる傾向があります。彼らは抽象的で理論的な情報を好み、具体的な事実には苦労することがあります。",
        ko: "직관형 사람들은 더 상상력이 풍부하고 미래 가능성에 집중하는 경향이 있습니다. 그들은 추상적이고 이론적인 정보를 선호하며 구체적인 사실에 어려움을 겪을 수 있습니다.",
        "pt-BR":
          "Os intuitivos tendem a ser mais imaginativos e a se concentrar em possibilidades futuras. Eles preferem informações abstratas e teóricas e podem ter dificuldade em lidar com fatos concretos ou com o presente imediato.",
      },
    },
    thinking: {
      title: {
        en: "Thinking",
        es: "Pensamiento",
        fr: "Pensée",
        jp: "思考",
        ko: "사고형",
        "pt-BR": "Pensamento",
      },
      abbreviation: "T",
      description: {
        en: "Thinkers tend to be more logical and focus on reason. They prefer to analyze objective and impartial information and may struggle with emotions or personal values.",
        es: "Los pensadores tienden a ser más lógicos y a centrarse en la razón. Prefieren analizar información objetiva e imparcial y pueden tener dificultades con las emociones o los valores personales.",
        fr: "Les penseurs ont tendance à être plus logiques et à se concentrer sur la raison. Ils préfèrent analyser des informations objectives et impartiales et peuvent avoir du mal avec les émotions ou les valeurs personnelles.",
        jp: "思考型の人は、より論理的で、理由に焦点を当てる傾向があります。彼らは客観的で公平な情報を分析することを好み、感情や個人的な価値観には苦労することがあります。",
        ko: "사고형 사람들은 더 논리적이고 이성에 집중하는 경향이 있습니다. 그들은 객관적이고 공정한 정보를 분석하는 것을 선호하며 감정이나 개인적 가치를 다루는 데 어려움을 겪을 수 있습니다.",
        "pt-BR":
          "Os pensadores tendem a ser mais lógicos e a se concentrar na razão. Eles preferem analisar informações objetivas e imparciais e podem ter dificuldade em lidar com emoções ou valores pessoais.",
      },
    },
    feeling: {
      title: {
        en: "Feeling",
        es: "Sentimiento",
        fr: "Sentiment",
        jp: "感情",
        ko: "감정형",
        "pt-BR": "Sentimento",
      },
      abbreviation: "F",
      description: {
        en: "Feelers tend to be more emotional and focus on personal values. They prefer to make decisions based on emotions and beliefs.",
        es: "Los sentimentales tienden a ser más emocionales y a centrarse en valores personales. Prefieren tomar decisiones basadas en emociones y creencias personales.",
        fr: "Les émotionnels ont tendance à être plus émotionnels et à se concentrer sur les valeurs personnelles. Ils préfèrent prendre des décisions basées sur les émotions et les croyances personnelles.",
        jp: "感情型の人は、より感情的で、個人的な価値観に焦点を当てる傾向があります。彼らは感情と信念に基づいて意思決定を行うことを好みます。",
        ko: "감정형 사람들은 더 감정적이고 개인적 가치에 집중하는 경향이 있습니다. 그들은 감정과 믿음에 근거하여 결정을 내리는 것을 선호합니다.",
        "pt-BR":
          "Os sentimentais tendem a ser mais emocionais e a se concentrar em valores pessoais. Eles preferem tomar decisões com base em suas emoções e em suas crenças pessoais.",
      },
    },
    judging: {
      title: {
        en: "Judging",
        es: "Juzgador",
        fr: "Jugement",
        jp: "判断型",
        ko: "판단형",
        "pt-BR": "Julgador",
      },
      abbreviation: "J",
      description: {
        en: "Judgers tend to be more organized and focus on results. They prefer to follow a plan and make decisions quickly and efficiently.",
        es: "Los juzgadores tienden a ser más organizados y a centrarse en los resultados. Prefieren seguir un plan y tomar decisiones de manera rápida y eficiente.",
        fr: "Les juges ont tendance à être plus organisés et à se concentrer sur les résultats. Ils préfèrent suivre un plan et prendre des décisions rapidement et efficacement.",
        jp: "判断型の人は、より整理整頓され、結果に焦点を当てる傾向があります。彼らは計画を守り、迅速かつ効率的に意思決定を行うことを好みます。",
        ko: "판단형 사람들은 더 조직적이고 결과에 집중하는 경향이 있습니다. 그들은 계획을 따르고 신속하고 효율적으로 결정을 내리는 것을 선호합니다.",
        "pt-BR":
          "Os julgadores tendem a ser mais organizados e a se concentrar em resultados. Eles preferem seguir um plano e tomar decisões de forma rápida e eficiente.",
      },
    },
    prospecting: {
      title: {
        en: "Prospecting",
        es: "Prospección",
        fr: "Prospection",
        jp: "探索型",
        ko: "탐색형",
        "pt-BR": "Prospecção",
      },
      abbreviation: "P",
      description: {
        en: "Prospectors tend to be more flexible and focus on possibilities. They prefer to keep their options open and explore different alternatives before making a decision.",
        es: "Los prospectores tienden a ser más flexibles y a centrarse en las posibilidades. Prefieren mantener abiertas sus opciones y explorar diferentes alternativas antes de tomar una decisión.",
        fr: "Les prospecteurs ont tendance à être plus flexibles et à se concentrer sur les possibilités. Ils préfèrent garder leurs options ouvertes et explorer différentes alternatives avant de prendre une décision.",
        jp: "探索型の人は、より柔軟で、可能性に焦点を当てる傾向があります。彼らは選択肢を開いたままにし、意思決定の前にさまざまな選択肢を探ることを好みます。",
        ko: "탐색형 사람들은 더 유연하고 가능성에 집중하는 경향이 있습니다. 그들은 결정을 내리기 전에 옵션을 열어두고 다양한 대안을 탐구하는 것을 선호합니다.",
        "pt-BR":
          "Os prospectores tendem a ser mais flexíveis e a se concentrar em possibilidades. Eles preferem manter as opções em aberto e explorar diferentes alternativas antes de tomar uma decisão.",
      },
    },
    assertive: {
      title: {
        en: "Assertive",
        es: "Asertivo",
        fr: "Assertif",
        jp: "断定的",
        ko: "자신감형",
        "pt-BR": "Assertivo",
      },
      abbreviation: "A",
      description: {
        en: "Assertives tend to be more confident and focus on their goals. They prefer to take the initiative and assume control of situations.",
        es: "Los asertivos tienden a ser más confiados y a centrarse en sus metas. Prefieren tomar la iniciativa y asumir el control de las situaciones.",
        fr: "Les assertifs ont tendance à être plus confiants et à se concentrer sur leurs objectifs. Ils préfèrent prendre l'initiative et assumer le contrôle des situations.",
        jp: "断定的な人は、より自信があり、目標に焦点を当てる傾向があります。彼らは主導権を握り、状況を支配することを好みます。",
        ko: "자신감형 사람들은 더 자신감 있고 목표에 집중하는 경향이 있습니다. 그들은 주도권을 잡고 상황을 통제하는 것을 선호합니다.",
        "pt-BR":
          "Os assertivos tendem a ser mais confiantes e a se concentrar em seus objetivos. Eles preferem tomar a iniciativa e assumir o controle de uma situação.",
      },
    },
    turbulent: {
      title: {
        en: "Turbulent",
        es: "Turbulento",
        fr: "Turbulent",
        jp: "不安定型",
        ko: "불안정형",
        "pt-BR": "Turbulento",
      },
      abbreviation: "T",
      description: {
        en: "Turbulents tend to be more anxious and focus on their emotions. They prefer to have backup plans and be prepared for worst-case scenarios.",
        es: "Los turbulentos tienden a ser más ansiosos y a centrarse en sus emociones. Prefieren tener planes de respaldo y estar preparados para los peores escenarios.",
        fr: "Les turbulents ont tendance à être plus anxieux et à se concentrer sur leurs émotions. Ils préfèrent avoir des plans de secours et être préparés aux pires scénarios.",
        jp: "不安定型の人は、より不安を感じ、感情に焦点を当てる傾向があります。彼らはバックアッププランを持ち、最悪の事態に備えることを好みます。",
        ko: "불안정형 사람들은 더 불안감을 느끼고 감정에 집중하는 경향이 있습니다. 그들은 백업 계획을 세우고 최악의 시나리오에 대비하는 것을 선호합니다.",
        "pt-BR":
          "Os turbulentos tendem a ser mais ansiosos e a se concentrar em suas emoções. Eles preferem ter um plano de backup e estar preparados para o pior cenário.",
      },
    },
  },
  pairs: {
    introverted: "extroverted",
    extroverted: "introverted",
    observant: "intuitive",
    intuitive: "observant",
    thinking: "feeling",
    feeling: "thinking",
    judging: "prospecting",
    prospecting: "judging",
    assertive: "turbulent",
    turbulent: "assertive",
  },
  display: {
    introverted_extroverted: "energy",
    observant_intuitive: "mind",
    thinking_feeling: "nature",
    judging_prospecting: "tactics",
    assertive_turbulent: "identity",
  },
}

export default texts
