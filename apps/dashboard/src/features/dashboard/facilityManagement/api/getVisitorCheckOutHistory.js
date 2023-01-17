import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, SUBSCRIBER_KEY } from "~/utils/tokenStorage";

export async function getVisitorCheckOutHistory({ page, pageSize }) {
    try {
        const token = tokenStorage.getTokens();
        const { data } = await axiosInstance.get(`/subscriber/visitor-history`, {
            params: {
                page: page + 1,
                per_page: pageSize
            },
            headers: createHeaders(token[SUBSCRIBER_KEY]),
        });

        return data;
    } catch (error) {
        return Promise.reject({ ...error.response, ...error });
    }
}
