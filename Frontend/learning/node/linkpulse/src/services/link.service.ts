import redis from "../config/redis";
import { saveLink, getLinkByShortCode, Link } from "../models/link.model";
import { ClickEvent } from "../models/analytics.model";
import { nanoid } from "nanoid";

const CACHE_PREFIX = "link:";
const CACHE_TTL = 3600;

export const generateShortCode = (): string => {
    return nanoid(8); // 
}

