<template>
  <div>
    <div class="error">
        <div class="error-header error-header--{{ props.type }}">
            <h1 class="error-header__code">{{ errorBase[props.type].statusCode }}</h1>
            <h2 class="error-header__message">{{ errorBase[props.type][props.lang].statusMessage }}</h2>
        </div>
        <div class="error-body">
            <p class="error-body__explanation">{{ errorBase[props.type][props.lang].explanationMessage }}</p>
            <p class="error-body__guide">{{ errorBase[props.type][props.lang].guideMessage }}</p>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  props: {
    type: String,
    default: props
  }
})

const errorBase = [
    {
        statusCode: 404,
        pt_BR: {
            statusMessage: "Página não encontrada",
            explanationMessage: "É raro, mas acontece sempre.",
            guideMessage: "Certeza que o endereço está correto? Velha se não há erros de digitação, tradução ou algo do tipo, ou a página pode ter sido removida.",
        },
        en_US: {
            statusMessage: "Page not found",
            explanationMessage: "It's rare, but it happens all the time.",
            guideMessage: "Make sure the address is correct. Check for typos, translations, or other issues, or the page may have been removed.",
        },
        de_DE: {
            statusMessage: "Seite nicht gefunden",
            explanationMessage: "Es ist selten, aber es passiert die ganze Zeit.",
            guideMessage: "Stellen Sie sicher, dass die Adresse korrekt ist. Überprüfen Sie auf Tippfehler, Übersetzungen oder andere Probleme, oder die Seite wurde möglicherweise entfernt.",
        },
        es_ES: {
            statusMessage: "Página no encontrada",
            explanationMessage: "Es raro, pero sucede todo el tiempo.",
            guideMessage: "Asegúrate de que la dirección sea correcta. Verifica errores tipográficos, traducciones u otros problemas, o la página puede haber sido eliminada.",
        },
        fr_FR: {
            statusMessage: "Page non trouvée",
            explanationMessage: "C'est rare, mais ça arrive tout le temps.",
            guideMessage: "Assurez-vous que l'adresse est correcte. Vérifiez les fautes de frappe, les traductions ou d'autres problèmes, ou la page a peut-être été supprimée.",
        },
        it_IT: {
            statusMessage: "Pagina non trovata",
            explanationMessage: "È raro, ma succede sempre.",
            guideMessage: "Assicurati che l'indirizzo sia corretto. Controlla errori di battitura, traduzioni o altri problemi, o la pagina potrebbe essere stata rimossa.",
        },
        ja_JP: {
            statusMessage: "ページが見つかりません",
            explanationMessage: "これは珍しいことですが、よくあります。",
            guideMessage: "アドレスが正しいことを確認してください。タイプミス、翻訳、その他の問題を確認するか、ページが削除された可能性があります。",
        },
        zh_CN: {
            statusMessage: "页面未找到",
            explanationMessage: "这很少见，但经常发生。",
            guideMessage: "确保地址正确。检查拼写错误、翻译或其他问题，或者页面可能已被删除。",
        },
        ko_KR: {
            statusMessage: "페이지를 찾을 수 없습니다",
            explanationMessage: "드물지만 자주 발생합니다.",
            guideMessage: "주소가 올바른지 확인하세요. 오타, 번역 또는 기타 문제를 확인하거나 페이지가 삭제되었을 수 있습니다.",
        },
        en_CA: {
            statusMessage: "Page not found",
            explanationMessage: "It's rare, but it happens all the time.",
            guideMessage: "Make sure the address is correct. Check for typos, translations, or other issues, or the page may have been removed.",
        },
        pt_PT: {
            statusMessage: "Página não encontrada",
            explanationMessage: "É raro, mas acontece sempre.",
            guideMessage: "Certeza que o endereço está correto? Verifique se há erros de digitação, traduções ou outros problemas, ou a página pode ter sido removida.",
        },
        ru_RU: {
            statusMessage: "Страница не найдена",
            explanationMessage: "Это редко, но такое случается.",
            guideMessage: "Убедитесь, что адрес правильный. Проверьте на опечатки, переводы или другие проблемы, или страница могла быть удалена.",
        },
        ar_AR: {
            statusMessage: "الصفحة غير موجودة",
            explanationMessage: "هذا نادر، لكنه يحدث طوال الوقت.",
            guideMessage: "تأكد من صحة العنوان. تحقق من الأخطاء المطبعية، والترجمات، أو مشاكل أخرى، أو قد تكون الصفحة قد أزيلت.",
        }
    },
    {
        statusCode: 403,
        pt_BR: {
            statusMessage: "Sem acesso",
            explanationMessage: "Nem tudo na vida é para ser visto, apenas vivido. Esse é um desses casos, de viver... a proibição.",
            guideMessage: "Verifique se você tem permissão para acessar esta página. Se você acha que isso é um erro, entre em contato com o administrador do site (vide eu, nos contatos do site).",
        },
        en_US: {
            statusMessage: "Access denied",
            explanationMessage: "Not everything in life is meant to be seen, only lived. This is one of those cases, of living... the prohibition.",
            guideMessage: "Check if you have permission to access this page. If you think this is an error, contact the site administrator (me, in the site's contacts).",
        },
        de_DE: {
            statusMessage: "Zugriff verweigert",
            explanationMessage: "Nicht alles im Leben ist dazu gedacht, gesehen zu werden, sondern nur gelebt. Dies ist einer dieser Fälle, das Verbot zu leben.",
            guideMessage: "Überprüfen Sie, ob Sie die Berechtigung haben, auf diese Seite zuzugreifen. Wenn Sie denken, dass dies ein Fehler ist, kontaktieren Sie den Site-Administrator (mich, in den Kontakten der Website).",
        },
        es_ES: {
            statusMessage: "Acceso denegado",
            explanationMessage: "No todo en la vida está destinado a ser visto, solo vivido. Este es uno de esos casos, de vivir... la prohibición.",
            guideMessage: "Verifica si tienes permiso para acceder a esta página. Si crees que esto es un error, contacta al administrador del sitio (yo, en los contactos del sitio).",
        },
        it_IT: {
            statusMessage: "Accesso negato",
            explanationMessage: "Non tutto nella vita è destinato a essere visto, solo vissuto. Questo è uno di quei casi, di vivere... il divieto.",
            guideMessage: "Controlla se hai il permesso di accedere a questa pagina. Se pensi che si tratti di un errore, contatta l'amministratore del sito (me, nei contatti del sito).",
        },
        ja_JP: {
            statusMessage: "アクセス拒否",
            explanationMessage: "人生のすべてが見るためのものではなく、ただ生きるためのものです。これはそのようなケースの一つで、禁止を生きることです。",
            guideMessage: "このページにアクセスする権限があるか確認してください。これがエラーだと思う場合は、サイト管理者（私、サイトの連絡先）に連絡してください。",
        },
        zh_CN: {
            statusMessage: "访问被拒绝",
            explanationMessage: "生活中并非一切都应该被看到，而是应该被体验。这就是其中一个案例，体验... 禁止。",
            guideMessage: "检查您是否有权限访问此页面。如果您认为这是一个错误，请联系网站管理员（我，在网站的联系方式中）。",
        },
        ko_KR: {
            statusMessage: "접근 거부",
            explanationMessage: "인생의 모든 것이 보여지는 것이 아니라, 살아가는 것입니다. 이것은 금지를 경험하는 경우 중 하나입니다.",
            guideMessage: "이 페이지에 접근할 권한이 있는지 확인하세요. 이게 오류라고 생각되면 사이트 관리자(저, 사이트 연락처에)에게 연락하세요.",
        },
        pt_PT: {
            statusMessage: "Sem acesso",
            explanationMessage: "Nem tudo na vida é para ser visto, apenas vivido. Esse é um desses casos, de viver... a proibição.",
            guideMessage: "Verifique se você tem permissão para acessar esta página. Se você acha que isso é um erro, entre em contato com o administrador do site (vide eu, nos contatos do site).",
        },
        ru_RU: {
            statusMessage: "Доступ запрещен",
            explanationMessage: "Не все в жизни предназначено для просмотра, только для жизни. Это один из таких случаев, жить... запретом.",
            guideMessage: "Проверьте, есть ли у вас разрешение на доступ к этой странице. Если вы думаете, что это ошибка, свяжитесь с администратором сайта (со мной, в контактах сайта).",
        },
        ar_AR: {
            statusMessage: "الصفحة غير موجودة",
            explanationMessage: "هذا نادر، لكنه يحدث طوال الوقت.",
            guideMessage: "تأكد من صحة العنوان. تحقق من الأخطاء المطبعية، والترجمات، أو مشاكل أخرى، أو قد تكون الصفحة قد أزيلت.",
        }
    },
    {
        statusCode: 500,
        pt_BR: {
            statusMessage: "Erro interno",
            explanationMessage: "Pane no sistema, algo se desconfigurou\nAonde estão os logs do servidor? 🎵",
            guideMessage: "Tente novamente mais tarde ou entre em contato com o administrador do site (eu, nos contatos do site).",
        },
        en_US: {
            statusMessage: "Internal error",
            explanationMessage: "Oops, something went wrong... but don't worry, the server error isn't Chaves' fault.",
            guideMessage: "Try again later or contact the site administrator (me, in the site's contacts).",
        },
        de_DE: {
            statusMessage: "Interner Fehler",
            explanationMessage: "Ups, etwas ist schief gelaufen... aber keine Sorge, der Serverfehler ist nicht Chaves' Schuld.",
            guideMessage: "Versuchen Sie es später noch einmal oder kontaktieren Sie den Site-Administrator (mich, in den Kontakten der Website).",
        },
        es_ES: {
            statusMessage: "Error interno",
            explanationMessage: "Vaya, algo salió mal... pero no te preocupes, el error del servidor no es culpa de Chaves.",
            guideMessage: "Inténtalo de nuevo más tarde o contacta al administrador del sitio (yo, en los contactos del sitio).",
        },
        it_IT: {
            statusMessage: "Errore interno",
            explanationMessage: "Ops, qualcosa è andato storto... ma non preoccuparti, l'errore del server non è colpa di Chaves.",
            guideMessage: "Riprova più tardi o contatta l'amministratore del sito (me, nei contatti del sito).",
        },
        ja_JP: {
            statusMessage: "内部エラー",
            explanationMessage: "おっと、何かがうまくいかなかった...でも心配しないで、サーバーエラーはチャベスのせいではありません。",
            guideMessage: "後でもう一度試すか、サイト管理者（私、サイトの連絡先に）に連絡してください。",
        },
        zh_CN: {
            statusMessage: "内部错误",
            explanationMessage: "哎呀，出了点问题...但别担心，服务器错误不是查韦斯的错。",
            guideMessage: "稍后再试或联系网站管理员（我，在网站的联系方式中）。",
        },
        ko_KR: {
            statusMessage: "내부 오류",
            explanationMessage: "어머, 뭔가 잘못됐어요... 하지만 걱정하지 마세요, 서버 오류는 차베스의 잘못이 아니에요.",
            guideMessage: "나중에 다시 시도하거나 사이트 관리자(저, 사이트 연락처에)에게 연락하세요.",
        },
        pt_PT: {
            statusMessage: "Erro interno",
            explanationMessage: "Vish menor, deu ruim... mas não se preocupe, o erro do servidor não é culpa do Chaves.",
            guideMessage: "Tente novamente mais tarde ou entre em contato com o administrador do site (eu, nos contatos do site).",
        },
        ru_RU: {
            statusMessage: "Внутренняя ошибка",
            explanationMessage: "Ой, что-то пошло не так... но не волнуйтесь, ошибка сервера не вина Чавеса.",
            guideMessage: "Попробуйте позже или свяжитесь с администратором сайта (со мной, в контактах сайта).",
        },
        ar_AR: {
            statusMessage: "خطأ داخلي",
            explanationMessage: "عفوًا، حدث خطأ ما... لكن لا تقلق، خطأ الخادم ليس خطأ تشافيز.",
            guideMessage: "حاول مرة أخرى لاحقًا أو اتصل بمدير الموقع (أنا، في اتصالات الموقع).",
        }
    },
    {
        statusCode: 503,
        pt_BR: {
            statusMessage: "Indisponível",
            explanationMessage: "O servidor em específico está temporariamente indisponível, mas não se preocupe, deve ter sido o dev que esqueceu de atualizar todas as alterações (é raro, mas acontece sempre).",
            guideMessage: "Tente novamente mais tarde ou entre em contato com o administrador do site (vide \"eu\", nos contatos do site).",
        },
        en_US: {
            statusMessage: "Unavailable",
            explanationMessage: "The specific server is temporarily unavailable, but don't worry, it was probably the dev who forgot to update all changes (it's rare, but it always happens).",
            guideMessage: "Try again later or contact the site administrator (me, in the site's contacts).",
        },
        de_DE: {
            statusMessage: "Nicht verfügbar",
            explanationMessage: "Der spezifische Server ist vorübergehend nicht verfügbar, aber keine Sorge, es war wahrscheinlich der Entwickler, der vergessen hat, alle Änderungen zu aktualisieren (es ist selten, aber es passiert immer).",
            guideMessage: "Versuchen Sie es später noch einmal oder kontaktieren Sie den Site-Administrator (mich, in den Kontakten der Website).",
        },
        es_ES: {
            statusMessage: "No disponible",
            explanationMessage: "El servidor específico está temporalmente no disponible, pero no te preocupes, probablemente fue el desarrollador quien olvidó actualizar todos los cambios (es raro, pero siempre sucede).",
            guideMessage: "Inténtalo de nuevo más tarde o contacta al administrador del sitio (yo, en los contactos del sitio).",
        },
        it_IT: {
            statusMessage: "Non disponibile",
            explanationMessage: "Il server specifico è temporaneamente non disponibile, ma non preoccuparti, probabilmente è stato lo sviluppatore a dimenticare di aggiornare tutte le modifiche (è raro, ma succede sempre).",
            guideMessage: "Riprovare più tardi o contattare l'amministratore del sito (me, nei contatti del sito).",
        },
        ja_JP: {
            statusMessage: "利用不可",
            explanationMessage: "特定のサーバーは一時的に利用できませんが、心配しないでください。おそらく開発者がすべての変更を更新するのを忘れたからです（これは珍しいことですが、いつも起こります）。",
            guideMessage: "後でもう一度試すか、サイト管理者（私、サイトの連絡先に）に連絡してください。",
        },
        zh_CN: {
            statusMessage: "内部错误",
            explanationMessage: "哎呀，出了点问题...但别担心，服务器错误不是查韦斯的错。",
            guideMessage: "稍后再试或联系网站管理员（我，在网站的联系方式中）。",
        },
        ko_KR: {
            statusMessage: "사용 불가",
            explanationMessage: "특정 서버가 일시적으로 사용할 수 없지만 걱정하지 마세요, 아마도 개발자가 모든 변경 사항을 업데이트하는 것을 잊었을 것입니다 (드물지만 항상 발생합니다).",
            guideMessage: "나중에 다시 시도하거나 사이트 관리자(저, 사이트 연락처에)에게 연락하세요.",
        },
        pt_PT: {
            statusMessage: "Indisponível",
            explanationMessage: "O servidor em específico está temporariamente indisponível, mas não se preocupe, deve ter sido o dev que esqueceu de atualizar todas as alterações (é raro, mas acontece sempre).",
            guideMessage: "Tente novamente mais tarde ou entre em contato com o administrador do site (vide \"eu\", nos contatos do site).",
        },
        ru_RU: {
            statusMessage: "Недоступно",
            explanationMessage: "Конкретный сервер временно недоступен, но не волнуйтесь, вероятно, это разработчик забыл обновить все изменения (это редко, но всегда случается).",
            guideMessage: "Попробуйте позже или свяжитесь с администратором сайта (со мной, в контактах сайта).",
        },
        ar_AR: {
            statusMessage: "خطأ داخلي",
            explanationMessage: "عفوًا، حدث خطأ ما... لكن لا تقلق، خطأ الخادم ليس خطأ تشافيز.",
            guideMessage: "حاول مرة أخرى لاحقًا أو اتصل بمدير الموقع (أنا، في اتصالات الموقع).",
        }
    },
    {
        statusCode: 429,
        pt_BR: {
            statusMessage: "Muitos pedidos",
            explanationMessage: "Você está fazendo muitos pedidos, mas não se preocupe, é só esperar um pouco.",
            guideMessage: "Tente novamente mais tarde ou entre em contato com o administrador do site (vide \"eu\", nos contatos do site).",
        },
        en_US: {
            statusMessage: "Too many requests",
            explanationMessage: "You're making too many requests, but don't worry, just wait a bit.",
            guideMessage: "Try again later or contact the site administrator (me, in the site's contacts).",
        },
        de_DE: {
            statusMessage: "Zu viele Anfragen",
            explanationMessage: "Sie stellen zu viele Anfragen, aber keine Sorge, warten Sie einfach eine Weile.",
            guideMessage: "Versuchen Sie es später noch einmal oder kontaktieren Sie den Site-Administrator (mich, in den Kontakten der Website).",
        },
        es_ES: {
            statusMessage: "Demasiadas solicitudes",
            explanationMessage: "Estás haciendo demasiadas solicitudes, pero no te preocupes, solo espera un poco.",
            guideMessage: "Inténtalo de nuevo más tarde o contacta al administrador del sitio (yo, en los contactos del sitio).",
        },
        it_IT: {
            statusMessage: "Troppe richieste",
            explanationMessage: "Stai facendo troppe richieste, ma non preoccuparti, aspetta un po'.",
            guideMessage: "Riprova più tardi o contatta l'amministratore del sito (me, nei contatti del sito).",
        },
        ja_JP: {
            statusMessage: "リクエストが多すぎます",
            explanationMessage: "リクエストが多すぎますが、心配しないでください、少し待ってください。",
            guideMessage: "後でもう一度試すか、サイト管理者（私、サイトの連絡先に）に連絡してください。",
        },
        zh_CN: {
            statusMessage: "请求过多",
            explanationMessage: "您正在发送太多请求，但不用担心，只需稍等片刻。",
            guideMessage: "稍后再试或联系网站管理员（我，在网站的联系方式中）。",
        },
        ko_KR: {
            statusCode: "요청이 너무 많음",
            explanationMessage: "너무 많은 요청을 하고 있지만 걱정하지 마세요, 잠시 기다리면 됩니다.",
            guideMessage: "나중에 다시 시도하거나 사이트 관리자(저, 사이트 연락처에)에게 연락하세요.",
        },
        pt_PT: {
            statusCode: "Muitos pedidos",
            explanationMessage: "Você está fazendo muitos pedidos, mas não se preocupe, é só esperar um pouco.",
            guideMessage: "Tente novamente mais tarde ou entre em contato com o administrador do site (vide \"eu\", nos contatos do site).",
        },
        ru_RU: {
            statusCode: "Слишком много запросов",
            explanationMessage: "Вы делаете слишком много запросов, но не волнуйтесь, просто подождите немного.",
            guideMessage: "Попробуйте позже или свяжитесь с администратором сайта (со мной, в контактах сайта).",
        },
        ar_AR: {
            statusCode: "خطأ داخلي",
            explanationMessage: "عفوًا، حدث خطأ ما... لكن لا تقلق، خطأ الخادم ليس خطأ تشافيز.",
            guideMessage: "حاول مرة أخرى لاحقًا أو اتصل بمدير الموقع (أنا، في اتصالات الموقع).",
        }
    },
    {
        statusCode: -1,
        pt_BR: {
            statusMessage: "Erro desconhecido",
            explanationMessage: "Algo deu errado... muito errado.",
            guideMessage: "Isso é um erro desconhecido, mas não se preocupe, o dev está trabalhando para resolver isso. Tente novamente mais tarde ou entre em contato com o administrador do site (vide \"eu\", nos contatos do site).",
        },
        en_US: {
            statusMessage: "Unknown error",
            explanationMessage: "Something went wrong... very wrong.",
            guideMessage: "This is an unknown error, but don't worry, the dev is working to fix it. Try again later or contact the site administrator (me, in the site's contacts).",
        },
        ru_RU: {
            statusMessage: "Неизвестная ошибка",
            explanationMessage: "Что-то пошло не так... очень не так.",
            guideMessage: "Это неизвестная ошибка, но не волнуйтесь, разработчик работает над ее исправлением. Попробуйте позже или свяжитесь с администратором сайта (со мной, в контактах сайта).",
        },
        ar_AR: {
            statusMessage: "خطأ داخلي",
            explanationMessage: "عفوًا، حدث خطأ ما... لكن لا تقلق، خطأ الخادم ليس خطأ تشافيز.",
            guideMessage: "حاول مرة أخرى لاحقًا أو اتصل بمدير الموقع (أنا، في اتصالات الموقع).",
        },
        de_DE: {
            statusMessage: "Unbekannter Fehler",
            explanationMessage: "Etwas ist schief gelaufen... sehr schief.",
            guideMessage: "Dies ist ein unbekannter Fehler, aber keine Sorge, der Entwickler arbeitet daran, ihn zu beheben. Versuchen Sie es später noch einmal oder kontaktieren Sie den Site-Administrator (mich, in den Kontakten der Website).",
        },
        es_ES: {
            statusMessage: "Error desconocido",
            explanationMessage: "Algo salió mal... muy mal.",
            guideMessage: "Este es un error desconocido, pero no te preocupes, el desarrollador está trabajando para solucionarlo. Inténtalo de nuevo más tarde o contacta al administrador del sitio (yo, en los contactos del sitio).",
        },
        it_IT: {
            statusMessage: "Errore sconosciuto",
            explanationMessage: "Qualcosa è andato storto... molto storto.",
            guideMessage: "Questo è un errore sconosciuto, ma non preoccuparti, il dev sta lavorando per risolverlo. Riprova più tardi o contatta l'amministratore del sito (me, nei contatti del sito).",
        },
        ja_JP: {
            statusMessage: "不明なエラー",
            explanationMessage: "何かがうまくいかなかった...非常にうまくいかなかった。",
            guideMessage: "これは不明なエラーですが、心配しないでください、開発者はそれを修正するために働いています。後でもう一度試すか、サイト管理者（私、サイトの連絡先に）に連絡してください。",
        },
        zh_CN: {
            statusMessage: "未知错误",
            explanationMessage: "出了点问题...非常严重。",
            guideMessage: "这是一个未知错误，但不用担心，开发者正在努力修复它。稍后再试或联系网站管理员（我，在网站的联系方式中）。",
        },
        ko_KR: {
            statusMessage: "알 수 없는 오류",
            explanationMessage: "뭔가 잘못됐어요... 매우 잘못됐어요.",
            guideMessage: "이것은 알 수 없는 오류지만 걱정하지 마세요, 개발자가 이를 수정하기 위해 노력하고 있어요. 나중에 다시 시도하거나 사이트 관리자(저, 사이트 연락처에)에게 연락하세요.",
        },
        pt_PT: {
            statusMessage: "Erro desconhecido",
            explanationMessage: "Algo deu errado... muito errado.",
            guideMessage: "Isso é um erro desconhecido, mas não se preocupe, o dev está trabalhando para resolver isso. Tente novamente mais tarde ou entre em contato com o administrador do site (vide \"eu\", nos contatos do site).",
        }
    }
];

const { t } = useI18n()
const lang = props.error.lang || 'pt-BR'
lang.replace('-', '_') // Normalize language code to match the errorBase structure
const errorType = props.error.statusCode || -1

const error = errorBase[errorType] || errorBase[404]
</script>