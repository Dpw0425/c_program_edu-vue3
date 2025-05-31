import request from "@/utils/request"
import type { competitionListResponseData } from "./type"

const COMPETITION_API = '/competition'

enum API {
    COMPETITION_LIST_URL = COMPETITION_API + '/list',
}

export const reqCompetitionList = () =>
    request.get<any, competitionListResponseData>(API.COMPETITION_LIST_URL)
