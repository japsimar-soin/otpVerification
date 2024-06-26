export const BACKEND_URL = "http://localhost:4002";

export const getUserTypeFunction = (email) => {
    const studentPattern = /^20\d{2}[BbMm][a-zA-Z]{3}\d{3}@nitsri\.ac\.in$/;
    const nitsriDomainPattern = /@nitsri\.ac\.in$/;

    if (studentPattern.test(email)) {
        return "student";
    } else if (nitsriDomainPattern.test(email)) {
        return "professor";
    } else {
        return "recruiter";
    }
};