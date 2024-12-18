import { Invite } from "../model/invite";
import { Team } from "../model/team";
import { User} from "../model/user";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();