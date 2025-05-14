<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
$CurDir = $APPLICATION->GetCurDir();
$CurUri = $APPLICATION->GetCurUri();
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
use Bitrix\Main\Loader;

?>
<!doctype html>
<html lang="<?=LANGUAGE_ID?>">
<head>
    <?

    use Bitrix\Main\Page\Asset;
    use Bitrix\Main\UI\Extension;
    // JS

    CJSCore::Init(array("jquery3"));

    Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . '/css/app.css');

    // CSS;
    // HEADERS
    $APPLICATION->ShowHead();
    ?>

	<link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/css/premium.css">

    <script defer src="https://smartcaptcha.yandexcloud.net/captcha.js"></script>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <meta property="og:title" content="Greek Legend – Оливковое масло премиального качества из Греции">
    <meta property="og:description" content="Купить натуральное оливковое масло первого холодного отжима от греческих фермеров. Без фильтрации и смешивания, с доставкой по России.">
    <meta property="og:image" content="<?=SITE_TEMPLATE_PATH?>/img/cover.png">
    <meta property="og:url" content="https://greeklegend.ru">
    <meta property="og:type" content="website">
    <meta name="msapplication-TileColor" content="#ffffff">
    <!--    Favicon-->
    <meta name="theme-color" content="#ffffff">
    <link rel="icon" type="image/svg" href="<?=SITE_TEMPLATE_PATH?>/favicon/favicon.svg">

    <link rel="apple-touch-icon" sizes="180x180" href="<?=SITE_TEMPLATE_PATH?>/favicon/apple-touch-icon.png">

    <link rel="icon" type="image/png" sizes="32x32" href="<?=SITE_TEMPLATE_PATH?>/favicon/favicon-32x32.png">

    <link rel="icon" type="image/png" sizes="16x16" href="<?=SITE_TEMPLATE_PATH?>/favicon/favicon-16x16.png">

    <link rel="manifest" href="<?=SITE_TEMPLATE_PATH?>/favicon/site.webmanifest">

    <link rel="shortcut" href="<?=SITE_TEMPLATE_PATH?>/favicon/favicon.ico">

    <meta name="msapplication-TileColor" content="#000000">

    <meta name="msapplication-config" content="<?=SITE_TEMPLATE_PATH?>/favicon/browserconfig.xml">
    <title><? $APPLICATION->ShowTitle() ?></title>
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.x.x/dist/cdn.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(99773718, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true,
            ecommerce:"dataLayer"
        });
    </script>
    <!-- /Yandex.Metrika counter -->

</head>

<body>
<div id="captcha-container"></div>

<?$APPLICATION->ShowPanel();?>
<?$APPLICATION->IncludeComponent("bazarow:favorites.add", "", Array(),
);?>

<div class="visually-hidden">
    <?php include $_SERVER["DOCUMENT_ROOT"] . SITE_TEMPLATE_PATH . '/sprite.svg'; ?>
</div>

<div class="content">
    <?php if ($CurDir === '/personal/auth/'): ?>
        <header class="content__header header">
            <div class="header__wrapper header__wrapper--auth container">
                <a href="/" class="header__logo" aria-label="Перейти на главную">
                    <svg width="165" heigth="15">
                        <use xlink:href="<?=SITE_TEMPLATE_PATH?>/sprite.svg#logo"></use>
                    </svg>
                </a>
            </div>
        </header>
    <?else :?>

        <header class="content__header header">
            <div class="header__wrapper container">
                <a href="/" class="header__logo" aria-label="Перейти на главную">
                    <svg class="only-desktop" width="145" height="15">
                        <use xlink:href="<?=SITE_TEMPLATE_PATH?>/sprite.svg#logo"></use>
                    </svg>
                    <svg class="no-desktop" width="50" height="20">
                        <use xlink:href="<?=SITE_TEMPLATE_PATH?>/sprite.svg#logo-mob"></use>
                    </svg>
                </a>

                <button class="header__menu-btn" type="button" data-open-target="js-mobile-menu">
                    <svg width="16" height="16">
                        <use xlink:href="<?=SITE_TEMPLATE_PATH?>/sprite.svg#burger"></use>
                    </svg>
                    Каталог
                </button>

                <nav class="header__nav nav js-mobile-menu" data-modal-type="mobile-menu">
                    <div class="nav__inner">
                        <div class="nav__head">
                            <button class="nav__close" type="button" aria-label="Закрыть меню" data-close-target="js-mobile-menu">
                                <svg width="16" height="16">
                                    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/sprite.svg#cross"></use>
                                </svg>
                            </button>

                            <a href="/" class="nav__logo" aria-label="На главную">
                                <svg width="49" height="20">
                                    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/sprite.svg#logo-mob"></use>
                                </svg>
                            </a>
                        </div>

                        <?$APPLICATION->IncludeComponent("bitrix:menu", "header_menu", Array(
                            "ALLOW_MULTI_SELECT" => "N",
                            "CHILD_MENU_TYPE" => "left",
                            "DELAY" => "N",
                            "MAX_LEVEL" => "1",
                            "MENU_CACHE_GET_VARS" => array(
                                0 => "",
                            ),
                            "MENU_CACHE_TIME" => "3600",
                            "MENU_CACHE_TYPE" => "A",
                            "MENU_CACHE_USE_GROUPS" => "Y",
                            "ROOT_MENU_TYPE" => "top",
                            "USE_EXT" => "N",
                        ),
                            false
                        );?>


                        <div class="nav__footer">
                            <a href="/?logout=yes&<?=bitrix_sessid_get()?>" class="nav__exit">Выйти</a>
                        </div>
                    </div>
                </nav>

                <div class="header__user-actions">
                    <?$APPLICATION->IncludeComponent("bazarow:favorites.line", "", Array(),
                    );?>
                    <?
                    Loader::includeModule("sale");
                    $basketItems = CSaleBasket::GetList(
                        array(),
                        array(
                            "FUSER_ID" => CSaleBasket::GetBasketUserID(),
                            "LID" => SITE_ID,
                            "ORDER_ID" => "NULL",
                        ),
                        array()
                    );

                    ?>
                    <a href="/personal/cart/" class="user-link js-cart-amount <?=$CurDir === '/personal/cart/' ? 'user-link--active' : '';?>" data-count="<?=$basketItems?>">

                        <svg width="20" height="20">
                            <use href="<?=SITE_TEMPLATE_PATH?>/sprite.svg#cart"></use>
                        </svg>
                    </a>
                    <? if ($USER->IsAuthorized()):?>
                        <a href="/personal/" class="user-link user-link--auth <?= (strpos($CurDir, '/personal/') !== false ? 'user-link--active' : '') ?>">                            <svg width="20" height="20">
                                <use xlink:href="<?=SITE_TEMPLATE_PATH?>/sprite.svg#user"></use>
                            </svg>
                        </a>
                    <?else:?>
                        <a href="/personal/auth/" class="user-link user-link--not-auth">
                            <span class="no-mobile">Войти</span>
                            <svg width="22" height="22" viewBox="0 0 20 20">
                                <use xlink:href="<?=SITE_TEMPLATE_PATH?>/img/sprite.svg#user"></use>
                            </svg>
                        </a>
                    <?endif;?>
                </div>
            </div>
        </header>
    <?endif?>
    <? $extraClass = 'main';
    if ($CurDir === '/personal/' && !$USER->IsAuthorized()) {
        $extraClass = 'auth';
    } else if ($CurDir === '/personal/cart/') {
        $extraClass = 'main--padding list';
    } else if($CurDir === '/personal/auth/') {
        $extraClass = 'auth';
    } else if ($CurDir = '/wishlist/') {
        $extraClass = 'main--padding list';
    }
    ?>

    <main class="main content__main <?=$extraClass?>">
