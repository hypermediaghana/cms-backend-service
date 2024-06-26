import { Request, Response } from "express";
import { prisma } from "../utils/context";

export class siteRequest {
  async createSiteRequest(req: Request, res: Response) {
    try {
      const {
        job_title,
        email,
        country,
        industry,
        company_size,
        organization_name,
      } = req.body;

      const response = await prisma.site_requests.create({
        data: {
          job_title,
          email,
          company_size,
          country,
          industry,
          organization: {
            create: {
              name: organization_name,
            },
          },
        },
      });
      res
        .status(200)
        .json({ message: "Request Send Successfully", data: response });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", data: error });
    }
  }
}
