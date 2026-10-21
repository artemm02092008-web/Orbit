import { I18n } from "i18n-js";

const translations = {
  ru: {
    // Общие
    back: "Назад",
    error: "Ошибка",
    fill_fields: "Пожалуйста, заполните все поля",
    loading: "Загрузка...",
    save: "Сохранить",
    cancel: "Отмена",
    delete: "Удалить",
    month: "мес",

    // Вход (Login)
    login_title: "Вход в аккаунт",
    login_subtitle: "С возвращением! Введите свои данные.",
    login_data: "ДАННЫЕ ДЛЯ ВХОДА",
    email: "Электронная почта",
    password: "Пароль",
    password_placeholder: "Введите пароль",
    forgot_password: "Забыли пароль?",
    login_button: "Войти",
    no_account: "Нет аккаунта?",
    register_button: "Зарегистрироваться",
    disclaimer: "Ваши данные — только ваши.",
    login_error: "Ошибка входа",
    wrong_credentials: "Неверный email или пароль. Проверьте данные.",

    // Регистрация (Register)
    register_title: "Создать аккаунт",
    register_subtitle: "Будьте ближе к своим. Присоединяйтесь к Orbit.",
    profile_section: "ВАШ ПРОФИЛЬ",
    name: "Имя",
    username: "Имя пользователя",
    create_account: "Создать аккаунт",

    // Настройки (Settings)
    settings: "Настройки",
    notifications: "Уведомления",
    language: "Язык",
    premium: "Orbit Premium",
    logout: "Выйти из аккаунта",

    // Экран Языка (Language)
    search_lang: "Поиск языка",
    app_language: "Язык приложения",
    lang_changes_footer:
      "Язык изменится во всём приложении.\nПерезапуск не потребуется.",
    go_premium: "Перейти на Premium",

    // Профиль (Profile)
    profile: "Профиль",
    information: "ИНФОРМАЦИЯ",
    in_network: "В сети",
    edit_profile: "Редактировать профиль",
    choose_frame: "Выбрать рамку",

    // Мастерская (Workshop)
    workshop: "Мастерская",
    invite: "Пригласить на сервер",
    information_section: "ИНФОРМАЦИЯ",
    chat_section: "ОБЩЕНИЕ",
    voice_section: "ГОЛОСОВЫЕ",
    no_servers:
      "У вас пока нет серверов.\nНажмите на «+» слева, чтобы создать первый!",
    empty_section: "Здесь пока пусто. Создайте свой первый канал!",

    // Создание сервера (Create Server)
    create_server: "Создать сервер",
    create_server_subtitle:
      "Отдельное место для вашей команды, друзей и общих разговоров.",
    upload_icon: "Загрузить значок",
    upload_icon_change: "Изменить значок",
    upload_icon_hint: "PNG, JPG или SVG до 5 МБ. Рекомендуем 512 x 512.",
    server_name: "Название сервера",
    server_name_hint: "Можно изменить в любой момент.",
    server_type: "Для чего вы создаёте сервер?",
    for_friends: "Для друзей",
    for_friends_sub: "Общение в небольшом кругу",
    for_project: "Для проекта",
    for_project_sub: "Совместная работа и обсуждения",
    for_community: "Для сообщества",
    for_community_sub: "Открытое пространство по интересам",
    create_server_footer: "Каналы и роли можно настроить после создания.",

    // Настройки сервера (Server Settings)
    server_settings: "Настройки сервера",
    server_desc: "Сервер для совместных проектов",
    members: "участников",
    channels: "каналов",
    you_are_owner: "Вы владелец",
    management: "Управление",
    roles: "Роли",
    invites: "Приглашения",
    moderation: "Модерация",
    delete_server: "Удалить сервер",
    delete_warning:
      "Все каналы, сообщения и приглашения будут удалены. Это действие нельзя отменить.",
    enter_new_name: "Введите новое название",

    // Premium
    premium_subtitle:
      "Ваше общение — на новой орбите.\nВыберите больше возможностей.",
    files_50mb: "Файлы 50МБ",
    emoji: "Эмодзи",
    badge: "Значок",
    select_basic: "Выбрать Basic",
    max: "Максимум",
    files_500mb: "Файлы 500МБ",
    hd_stream: "HD-стрим",
    avatar: "Аватарка",
    select_pro: "Выбрать Pro",
    favorite_bonuses: "Любимые бонусы",
    with_premium: "С Premium",
    in_orbit: "На орбите",
    takeoff: "На взлёте",
    glow: "Сияние",
    with_love: "С любовью",
    autorenewal: "Автопродление · Отмена в любой момент",

    // Оплата (Payment)
    payment_title: "Оплата",
    payment_subtitle: "Введите данные вашей карты",
    card_number: "Номер карты",
    expiry: "Срок действия",
    cvv: "CVV",
    total: "Итого:",
    pay_button: "Оплатить",
    payment_footer: "Нажимая «Оплатить», вы соглашаетесь с условиями подписки.",

    // Успешная оплата (Success)
    success_title: "Успешно!",
    success_subtitle: "Вы подписались на Orbit Premium.",
    go_home: "Перейти на главную",

    // Рамки (Frames)
    frames_title: "Выбор рамки",
    frames_premium_only: "Рамки доступны только Premium",
    become_premium: "Стать Premium",
  },
  en: {
    // Общие
    back: "Back",
    error: "Error",
    fill_fields: "Please fill in all fields",
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    month: "mo",

    // Вход (Login)
    login_title: "Log in",
    login_subtitle: "Welcome back! Enter your details.",
    login_data: "LOGIN DETAILS",
    email: "Email",
    password: "Password",
    password_placeholder: "Enter password",
    forgot_password: "Forgot password?",
    login_button: "Log in",
    no_account: "No account?",
    register_button: "Sign up",
    disclaimer: "Your data is only yours.",
    login_error: "Login error",
    wrong_credentials:
      "Incorrect email or password. Please check your details.",

    // Регистрация (Register)
    register_title: "Create account",
    register_subtitle: "Be closer to your people. Join Orbit.",
    profile_section: "YOUR PROFILE",
    name: "Name",
    username: "Username",
    create_account: "Create account",

    // Настройки (Settings)
    settings: "Settings",
    notifications: "Notifications",
    language: "Language",
    premium: "Orbit Premium",
    logout: "Log out",

    // Экран Языка (Language)
    search_lang: "Search language",
    app_language: "App language",
    lang_changes_footer:
      "The language will change throughout the app.\nNo restart required.",
    go_premium: "Go Premium",

    // Профиль (Profile)
    profile: "Profile",
    information: "INFORMATION",
    in_network: "Online",
    edit_profile: "Edit profile",
    choose_frame: "Choose frame",

    // Мастерская (Workshop)
    workshop: "Workshop",
    invite: "Invite to server",
    information_section: "INFORMATION",
    chat_section: "CHAT",
    voice_section: "VOICE",
    no_servers:
      "You don't have any servers yet.\nClick «+» on the left to create your first one!",
    empty_section: "It's empty here. Create your first channel!",

    // Создание сервера (Create Server)
    create_server: "Create server",
    create_server_subtitle:
      "A separate place for your team, friends and shared conversations.",
    upload_icon: "Upload icon",
    upload_icon_change: "Change icon",
    upload_icon_hint: "PNG, JPG or SVG up to 5 MB. Recommended 512 x 512.",
    server_name: "Server name",
    server_name_hint: "You can change it at any time.",
    server_type: "What is your server for?",
    for_friends: "For friends",
    for_friends_sub: "Communication in a small circle",
    for_project: "For a project",
    for_project_sub: "Collaboration and discussions",
    for_community: "For a community",
    for_community_sub: "Open space by interests",
    create_server_footer:
      "Channels and roles can be configured after creation.",

    // Настройки сервера (Server Settings)
    server_settings: "Server settings",
    server_desc: "Server for collaborative projects",
    members: "members",
    channels: "channels",
    you_are_owner: "You are the owner",
    management: "Management",
    roles: "Roles",
    invites: "Invites",
    moderation: "Moderation",
    delete_server: "Delete server",
    delete_warning:
      "All channels, messages and invites will be deleted. This action cannot be undone.",
    enter_new_name: "Enter new name",

    // Premium
    premium_subtitle:
      "Your communication — on a new orbit.\nChoose more possibilities.",
    files_50mb: "Files 50MB",
    emoji: "Emoji",
    badge: "Badge",
    select_basic: "Select Basic",
    max: "Maximum",
    files_500mb: "Files 500MB",
    hd_stream: "HD stream",
    avatar: "Avatar",
    select_pro: "Select Pro",
    favorite_bonuses: "Favorite bonuses",
    with_premium: "With Premium",
    in_orbit: "In orbit",
    takeoff: "Takeoff",
    glow: "Glow",
    with_love: "With love",
    autorenewal: "Auto-renewal · Cancel anytime",

    // Оплата (Payment)
    payment_title: "Payment",
    payment_subtitle: "Enter your card details",
    card_number: "Card number",
    expiry: "Expiry date",
    cvv: "CVV",
    total: "Total:",
    pay_button: "Pay",
    payment_footer: "By clicking «Pay», you agree to the subscription terms.",

    // Успешная оплата (Success)
    success_title: "Success!",
    success_subtitle: "You have subscribed to Orbit Premium.",
    go_home: "Go to home",

    // Рамки (Frames)
    frames_title: "Choose frame",
    frames_premium_only: "Frames are available only for Premium",
    become_premium: "Become Premium",
  },
  es: {
    // Общие
    back: "Atrás",
    error: "Error",
    fill_fields: "Por favor, complete todos los campos",
    loading: "Cargando...",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    month: "mes",

    // Вход (Login)
    login_title: "Iniciar sesión",
    login_subtitle: "¡Bienvenido de nuevo! Ingrese sus datos.",
    login_data: "DATOS DE INICIO DE SESIÓN",
    email: "Correo electrónico",
    password: "Contraseña",
    password_placeholder: "Ingrese su contraseña",
    forgot_password: "¿Olvidó su contraseña?",
    login_button: "Iniciar sesión",
    no_account: "¿No tiene cuenta?",
    register_button: "Registrarse",
    disclaimer: "Sus datos son solo suyos.",
    login_error: "Error de inicio de sesión",
    wrong_credentials: "Correo o contraseña incorrectos.",

    // Регистрация (Register)
    register_title: "Crear cuenta",
    register_subtitle: "Esté más cerca de los suyos. Únase a Orbit.",
    profile_section: "SU PERFIL",
    name: "Nombre",
    username: "Nombre de usuario",
    create_account: "Crear cuenta",

    // Настройки (Settings)
    settings: "Ajustes",
    notifications: "Notificaciones",
    language: "Idioma",
    premium: "Orbit Premium",
    logout: "Cerrar sesión",

    // Экран Языка (Language)
    search_lang: "Buscar idioma",
    app_language: "Idioma de la aplicación",
    lang_changes_footer:
      "El idioma cambiará en toda la aplicación.\nNo es necesario reiniciar.",
    go_premium: "Ir a Premium",

    // Профиль (Profile)
    profile: "Perfil",
    information: "INFORMACIÓN",
    in_network: "En línea",
    edit_profile: "Editar perfil",
    choose_frame: "Elegir marco",

    // Мастерская (Workshop)
    workshop: "Taller",
    invite: "Invitar al servidor",
    information_section: "INFORMACIÓN",
    chat_section: "CHAT",
    voice_section: "VOZ",
    no_servers:
      "Aún no tienes servidores.\n¡Haz clic en «+» a la izquierda para crear el primero!",
    empty_section: "Está vacío aquí. ¡Crea tu primer canal!",

    // Создание сервера (Create Server)
    create_server: "Crear servidor",
    create_server_subtitle:
      "Un lugar separado para tu equipo, amigos y conversaciones compartidas.",
    upload_icon: "Subir icono",
    upload_icon_change: "Cambiar icono",
    upload_icon_hint: "PNG, JPG o SVG hasta 5 MB. Recomendado 512 x 512.",
    server_name: "Nombre del servidor",
    server_name_hint: "Puedes cambiarlo en cualquier momento.",
    server_type: "¿Para qué es tu servidor?",
    for_friends: "Para amigos",
    for_friends_sub: "Comunicación en un círculo pequeño",
    for_project: "Para un proyecto",
    for_project_sub: "Colaboración y discusiones",
    for_community: "Para una comunidad",
    for_community_sub: "Espacio abierto por intereses",
    create_server_footer:
      "Los canales y roles se pueden configurar después de la creación.",

    // Настройки сервера (Server Settings)
    server_settings: "Ajustes del servidor",
    server_desc: "Servidor para proyectos colaborativos",
    members: "miembros",
    channels: "canales",
    you_are_owner: "Eres el propietario",
    management: "Gestión",
    roles: "Roles",
    invites: "Invitaciones",
    moderation: "Moderación",
    delete_server: "Eliminar servidor",
    delete_warning:
      "Todos los canales, mensajes e invitaciones serán eliminados. Esta acción no se puede deshacer.",
    enter_new_name: "Ingrese el nuevo nombre",

    // Premium
    premium_subtitle:
      "Tu comunicación — en una nueva órbita.\nElige más posibilidades.",
    files_50mb: "Archivos 50MB",
    emoji: "Emoji",
    badge: "Insignia",
    select_basic: "Seleccionar Basic",
    max: "Máximo",
    files_500mb: "Archivos 500MB",
    hd_stream: "Transmisión HD",
    avatar: "Avatar",
    select_pro: "Seleccionar Pro",
    favorite_bonuses: "Bonificaciones favoritas",
    with_premium: "Con Premium",
    in_orbit: "En órbita",
    takeoff: "Despegue",
    glow: "Brillo",
    with_love: "Con amor",
    autorenewal: "Renovación automática · Cancela en cualquier momento",

    // Оплата (Payment)
    payment_title: "Pago",
    payment_subtitle: "Ingrese los datos de su tarjeta",
    card_number: "Número de tarjeta",
    expiry: "Fecha de vencimiento",
    cvv: "CVV",
    total: "Total:",
    pay_button: "Pagar",
    payment_footer:
      "Al hacer clic en «Pagar», aceptas los términos de la suscripción.",

    // Успешная оплата (Success)
    success_title: "¡Éxito!",
    success_subtitle: "Te has suscrito a Orbit Premium.",
    go_home: "Ir a inicio",

    // Рамки (Frames)
    frames_title: "Elegir marco",
    frames_premium_only: "Los marcos solo están disponibles para Premium",
    become_premium: "Hazte Premium",
  },
  fr: {
    // Общие
    back: "Retour",
    error: "Erreur",
    fill_fields: "Veuillez remplir tous les champs",
    loading: "Chargement...",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    month: "mois",

    // Вход (Login)
    login_title: "Connexion",
    login_subtitle: "Bon retour ! Entrez vos données.",
    login_data: "DONNÉES DE CONNEXION",
    email: "E-mail",
    password: "Mot de passe",
    password_placeholder: "Entrez le mot de passe",
    forgot_password: "Mot de passe oublié ?",
    login_button: "Se connecter",
    no_account: "Pas de compte ?",
    register_button: "S'inscrire",
    disclaimer: "Vos données ne sont qu'à vous.",
    login_error: "Erreur de connexion",
    wrong_credentials: "E-mail ou mot de passe incorrect.",

    // Регистрация (Register)
    register_title: "Créer un compte",
    register_subtitle: "Soyez plus proche des vôtres. Rejoignez Orbit.",
    profile_section: "VOTRE PROFIL",
    name: "Nom",
    username: "Nom d'utilisateur",
    create_account: "Créer un compte",

    // Настройки (Settings)
    settings: "Paramètres",
    notifications: "Notifications",
    language: "Langue",
    premium: "Orbit Premium",
    logout: "Se déconnecter",

    // Экран Языка (Language)
    search_lang: "Rechercher une langue",
    app_language: "Langue de l'application",
    lang_changes_footer:
      "La langue changera dans toute l'application.\nAucun redémarrage nécessaire.",
    go_premium: "Passer à Premium",

    // Профиль (Profile)
    profile: "Profil",
    information: "INFORMATION",
    in_network: "En ligne",
    edit_profile: "Modifier le profil",
    choose_frame: "Choisir un cadre",

    // Мастерская (Workshop)
    workshop: "Atelier",
    invite: "Inviter sur le serveur",
    information_section: "INFORMATION",
    chat_section: "CHAT",
    voice_section: "VOCAL",
    no_servers:
      "Vous n'avez pas encore de serveurs.\nCliquez sur «+» à gauche pour créer le premier !",
    empty_section: "C'est vide ici. Créez votre premier canal !",

    // Создание сервера (Create Server)
    create_server: "Créer un serveur",
    create_server_subtitle:
      "Un espace séparé pour votre équipe, vos amis et vos conversations partagées.",
    upload_icon: "Télécharger l'icône",
    upload_icon_change: "Changer l'icône",
    upload_icon_hint: "PNG, JPG ou SVG jusqu'à 5 Mo. Recommandé 512 x 512.",
    server_name: "Nom du serveur",
    server_name_hint: "Vous pouvez le modifier à tout moment.",
    server_type: "À quoi sert votre serveur ?",
    for_friends: "Pour les amis",
    for_friends_sub: "Communication en petit cercle",
    for_project: "Pour un projet",
    for_project_sub: "Collaboration et discussions",
    for_community: "Pour une communauté",
    for_community_sub: "Espace ouvert par intérêts",
    create_server_footer:
      "Les canaux et les rôles peuvent être configurés après la création.",

    // Настройки сервера (Server Settings)
    server_settings: "Paramètres du serveur",
    server_desc: "Serveur pour projets collaboratifs",
    members: "membres",
    channels: "canaux",
    you_are_owner: "Vous êtes le propriétaire",
    management: "Gestion",
    roles: "Rôles",
    invites: "Invitations",
    moderation: "Modération",
    delete_server: "Supprimer le serveur",
    delete_warning:
      "Tous les canaux, messages et invitations seront supprimés. Cette action est irréversible.",
    enter_new_name: "Entrez le nouveau nom",

    // Premium
    premium_subtitle:
      "Votre communication — sur une nouvelle orbite.\nChoisissez plus de possibilités.",
    files_50mb: "Fichiers 50Mo",
    emoji: "Émoji",
    badge: "Badge",
    select_basic: "Choisir Basic",
    max: "Maximum",
    files_500mb: "Fichiers 500Mo",
    hd_stream: "Flux HD",
    avatar: "Avatar",
    select_pro: "Choisir Pro",
    favorite_bonuses: "Bonus préférés",
    with_premium: "Avec Premium",
    in_orbit: "En orbite",
    takeoff: "Décollage",
    glow: "Lueur",
    with_love: "Avec amour",
    autorenewal: "Renouvellement automatique · Annulation à tout moment",

    // Оплата (Payment)
    payment_title: "Paiement",
    payment_subtitle: "Entrez les détails de votre carte",
    card_number: "Numéro de carte",
    expiry: "Date d'expiration",
    cvv: "CVV",
    total: "Total :",
    pay_button: "Payer",
    payment_footer:
      "En cliquant sur « Payer », vous acceptez les conditions d'abonnement.",

    // Успешная оплата (Success)
    success_title: "Succès !",
    success_subtitle: "Vous êtes abonné à Orbit Premium.",
    go_home: "Aller à l'accueil",

    // Рамки (Frames)
    frames_title: "Choisir un cadre",
    frames_premium_only: "Les cadres sont disponibles uniquement pour Premium",
    become_premium: "Devenir Premium",
  },
  de: {
    // Общие
    back: "Zurück",
    error: "Fehler",
    fill_fields: "Bitte füllen Sie alle Felder aus",
    loading: "Laden...",
    save: "Speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    month: "Monat",

    // Вход (Login)
    login_title: "Anmelden",
    login_subtitle: "Willkommen zurück! Geben Sie Ihre Daten ein.",
    login_data: "ANMELDEDATEN",
    email: "E-Mail",
    password: "Passwort",
    password_placeholder: "Passwort eingeben",
    forgot_password: "Passwort vergessen?",
    login_button: "Anmelden",
    no_account: "Kein Konto?",
    register_button: "Registrieren",
    disclaimer: "Ihre Daten gehören nur Ihnen.",
    login_error: "Anmeldefehler",
    wrong_credentials: "Falsche E-Mail oder Passwort.",

    // Регистрация (Register)
    register_title: "Konto erstellen",
    register_subtitle:
      "Seien Sie näher bei Ihren Leuten. Treten Sie Orbit bei.",
    profile_section: "IHR PROFIL",
    name: "Name",
    username: "Benutzername",
    create_account: "Konto erstellen",

    // Настройки (Settings)
    settings: "Einstellungen",
    notifications: "Benachrichtigungen",
    language: "Sprache",
    premium: "Orbit Premium",
    logout: "Abmelden",

    // Экран Языка (Language)
    search_lang: "Sprache suchen",
    app_language: "App-Sprache",
    lang_changes_footer:
      "Die Sprache ändert sich in der gesamten App.\nKein Neustart erforderlich.",
    go_premium: "Zu Premium wechseln",

    // Профиль (Profile)
    profile: "Profil",
    information: "INFORMATIONEN",
    in_network: "Online",
    edit_profile: "Profil bearbeiten",
    choose_frame: "Rahmen wählen",

    // Мастерская (Workshop)
    workshop: "Werkstatt",
    invite: "Auf Server einladen",
    information_section: "INFORMATIONEN",
    chat_section: "CHAT",
    voice_section: "SPRACHKANÄLE",
    no_servers:
      "Sie haben noch keine Server.\nKlicken Sie links auf «+», um den ersten zu erstellen!",
    empty_section: "Hier ist es leer. Erstellen Sie Ihren ersten Kanal!",

    // Создание сервера (Create Server)
    create_server: "Server erstellen",
    create_server_subtitle:
      "Ein separater Ort für Ihr Team, Ihre Freunde und gemeinsame Gespräche.",
    upload_icon: "Symbol hochladen",
    upload_icon_change: "Symbol ändern",
    upload_icon_hint: "PNG, JPG oder SVG bis 5 MB. Empfohlen 512 x 512.",
    server_name: "Servername",
    server_name_hint: "Kann jederzeit geändert werden.",
    server_type: "Wofür ist Ihr Server?",
    for_friends: "Für Freunde",
    for_friends_sub: "Kommunikation im kleinen Kreis",
    for_project: "Für ein Projekt",
    for_project_sub: "Zusammenarbeit und Diskussionen",
    for_community: "Für eine Community",
    for_community_sub: "Offener Raum nach Interessen",
    create_server_footer:
      "Kanäle und Rollen können nach der Erstellung konfiguriert werden.",

    // Настройки сервера (Server Settings)
    server_settings: "Servereinstellungen",
    server_desc: "Server für gemeinsame Projekte",
    members: "Mitglieder",
    channels: "Kanäle",
    you_are_owner: "Sie sind der Besitzer",
    management: "Verwaltung",
    roles: "Rollen",
    invites: "Einladungen",
    moderation: "Moderation",
    delete_server: "Server löschen",
    delete_warning:
      "Alle Kanäle, Nachrichten und Einladungen werden gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
    enter_new_name: "Neuen Namen eingeben",

    // Premium
    premium_subtitle:
      "Ihre Kommunikation — auf einer neuen Umlaufbahn.\nWählen Sie mehr Möglichkeiten.",
    files_50mb: "Dateien 50MB",
    emoji: "Emoji",
    badge: "Abzeichen",
    select_basic: "Basic wählen",
    max: "Maximum",
    files_500mb: "Dateien 500MB",
    hd_stream: "HD-Stream",
    avatar: "Avatar",
    select_pro: "Pro wählen",
    favorite_bonuses: "Lieblingsboni",
    with_premium: "Mit Premium",
    in_orbit: "Im Orbit",
    takeoff: "Abheben",
    glow: "Leuchten",
    with_love: "Mit Liebe",
    autorenewal: "Automatische Verlängerung · Jederzeit kündbar",

    // Оплата (Payment)
    payment_title: "Zahlung",
    payment_subtitle: "Geben Sie Ihre Kartendaten ein",
    card_number: "Kartennummer",
    expiry: "Ablaufdatum",
    cvv: "CVV",
    total: "Gesamt:",
    pay_button: "Bezahlen",
    payment_footer:
      "Durch Klicken auf «Bezahlen» stimmen Sie den Abonnementbedingungen zu.",

    // Успешная оплата (Success)
    success_title: "Erfolg!",
    success_subtitle: "Sie haben Orbit Premium abonniert.",
    go_home: "Zur Startseite",

    // Рамки (Frames)
    frames_title: "Rahmen wählen",
    frames_premium_only: "Rahmen sind nur für Premium verfügbar",
    become_premium: "Premium werden",
  },
};

const i18n = new I18n(translations);
i18n.locale = "ru";
i18n.enableFallback = true;

export default i18n;
