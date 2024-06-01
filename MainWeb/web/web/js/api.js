class ApiConnection {
    constructor() {
        this.apiUrl = 'http://31.129.57.26/api/';
    }

    async registerUser(login, email, password) {
        try {
            const response = await fetch(`${this.apiUrl}user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, email, password })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return `Error connecting to API: ${error.message}`;
        }
    }

    async passwordRecovery(email) {
        try {
            const response = await fetch(`${this.apiUrl}pwdchange`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email_pwd: email })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return `Error connecting to API: ${error.message}`;
        }
    }

    async passwordRecoveryGetCode(email, code) {
        try {
            const response = await fetch(`${this.apiUrl}pwdchange`);
            const data = await response.json();

            // Check if the code exists for the given email
            const codeExists = data.some(record => record.email_pwd === email && record.code === code);
            return codeExists;
        } catch (error) {
            return false;
        }
    }

    async passwordRecoveryGetUser(email) {
        try {
            const response = await fetch(`${this.apiUrl}pwdchange`);
            const data = await response.json();

            // Find user by email
            const user = data.find(record => record.email === email);
            return user ? { login: user.login, password: user.password, email: user.email } : null;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    async passwordRecoveryGetUserID(email) {
        try {
            const response = await fetch(`${this.apiUrl}pwdchange`);
            const data = await response.json();

            // Find user by email and return user ID
            const user = data.find(record => record.email === email);
            return user ? user.id_user : 0;
        } catch (error) {
            console.error(error.message);
            return 0;
        }
    }

    async passwordUpdate(id, user, password) {
        try {
            user.password = password;
            const response = await fetch(`${this.apiUrl}user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return `Error connecting to API: ${error.message}`;
        }
    }

    async authenticateUser(login, password) {
        try {
            const response = await fetch(`${this.apiUrl}user`);
            const data = await response.json();

            // Find user by login and password
            const user = data.find(u => u.login === login && u.password === password);

            if (user) {
                return `User authenticated successfully. User ID: ${user.id_user}`;
            } else {
                return 'Invalid login or password.';
            }
        } catch (error) {
            return `Error connecting to API: ${error.message}`;
        }
    }

    async getProjectsByUserRole(userId, roleId) {
        try {
            const response = await fetch(`${this.apiUrl}Role_in_project`);
            const rolesInProjects = await response.json();

            const userProjects = [];

            for (const roleInProject of rolesInProjects) {
                if (roleInProject.id_user === userId && roleInProject.id_role === roleId) {
                    const projectResponse = await fetch(`${this.apiUrl}Projects/${roleInProject.id_project}`);
                    const project = await projectResponse.json();
                    userProjects.push(project);
                }
            }

            return userProjects;
        } catch (error) {
            return `Error connecting to API: ${error.message}`;
        }
    }
}

export default ApiConnection;
