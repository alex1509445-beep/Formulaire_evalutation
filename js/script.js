document.addEventListener('DOMContentLoaded', () => { //se declenche des que le html est chargé
    const form = document.getElementById('signupForm');

    const inputs = {
        nom: document.getElementById('nom'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        securityCode: document.getElementById('security-code'),
        conditions: document.getElementById('conditions')
    };

    // regex

    const regexPatterns = {
        nom: /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/,
        email: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.[a-z]{2,}$/i,
        securityCode: /^[A-Z]{3}-[0-9]{3}-[A-Z]{3}$/i,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    };

    // Fonction pour afficher une erreur sur un champs

    const showError = (inputElement, errorElementId, message) => {
        const errorElement = document.getElementById(errorElementId);
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        inputElement.classList.add('border-red-500', 'bg-red-50');
        inputElement.classList.remove('border-[#e2cced]', 'bg-[#f6e6fc]');
    };

    // Fonction pour effacer une erreur sur un champs

    const clearError = (inputElement, errorElementId) => {
        const errorElement = document.getElementById(errorElementId);
        errorElement.classList.add('hidden');
        inputElement.classList.remove('border-red-500', 'bg-red-50');
        inputElement.classList.add('border-[#e2cced]', 'bg-[#f6e6fc]');
    };

    // fonctions de validation par champ

    // nom complet

    const validateNom = () => {
        const val = inputs.nom.value.trim();
        if (!val) {
            showError(inputs.nom, 'error-nom', 'Le nom complet est obligatoire.');
            return false;
        }
        if (!regexPatterns.nom.test(val)) {
            showError(inputs.nom, 'error-nom', 'Format : Prénom Nom (min 2 mots)');
            return false;
        }
        clearError(inputs.nom, 'error-nom');
        return true;
    };

    //email

    const validateEmail = () => {
        const val = inputs.email.value.trim();
        if (!val) {
            showError(inputs.email, 'error-email', "L'adresse email est obligatoire.");
            return false;
        }
        if (!regexPatterns.email.test(val)) {
            showError(inputs.email, 'error-email', "Email valide (domaines acceptés:gmail, yahoo, outlook, hotmail)");
            return false;
        }
        clearError(inputs.email, 'error-email');
        return true;
    };

    // mot de passe

    const validatePassword = () => {
        const val = inputs.password.value;
        if (!val) {
            showError(inputs.password, 'error-password', 'Le mot de passe est obligatoire.');
            return false;
        }
        if (!regexPatterns.password.test(val)) {
            showError(inputs.password, 'error-password', 'Le mot de passe doit contenir 8 caractères avec maj. min. chiffre et caractère spécial');
            return false;
        }
        clearError(inputs.password, 'error-password');
        return true;
    };

    //code de sécuriter

    const validateSecurityCode = () => {
        const val = inputs.securityCode.value.trim();
        if (!val) {
            showError(inputs.securityCode, 'error-security-code', 'Le code de sécurité est obligatoire.');
            return false;
        }
        if (!regexPatterns.securityCode.test(val)) {
            showError(inputs.securityCode, 'error-security-code', 'Format attendu: ABC-123-XYZ');
            return false;
        }
        clearError(inputs.securityCode, 'error-security-code');
        return true;
    };

    // conditions d'utilisation

    const validateConditions = () => {
        if (!inputs.conditions.checked) {
            showError(inputs.conditions, 'error-conditions', 'Vous devez accepter les conditions');
            return false;
        }
        clearError(inputs.conditions, 'error-conditions');
        return true;
    };

    // évenement "input"  pour rendre le formulaire réactif

    inputs.nom.addEventListener('input', validateNom);
    inputs.email.addEventListener('input', validateEmail);
    inputs.password.addEventListener('input', validatePassword);
    inputs.securityCode.addEventListener('input', validateSecurityCode);
    inputs.conditions.addEventListener('change', validateConditions);

    // événement au moment de la soumission du formulaire

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // toutes les validations

        const isNomValid = validateNom();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isSecurityCodeValid = validateSecurityCode();
        const isConditionsValid = validateConditions();

        // déclenche l'alerte

        if (isNomValid && isEmailValid && isPasswordValid && isSecurityCodeValid && isConditionsValid) {
            alert("Votre compte a été créé avec succès !");
            form.reset(); // Réinitialise le formulaire après succès
        }
    });
});