import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, FREELANCER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function getCompanySize() {
    try {
        const token = tokenStorage.getTokens();
        const { data } = await axiosInstance.get(
            "/freelancer/company-sizes",
            {
                headers: createHeaders(token[FREELANCER_KEY]),
            }
        );

        return data;
    } catch (error) {
        return Promise.reject({ ...error.response, ...error });
    }
}