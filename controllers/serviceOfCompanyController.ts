//TODO Delete all file
import {Request, Response} from 'express';

const ServiceOfCompany = require('../models/serviceOfCompany');

export class ServiceOfCompanyController {
    public addServicesOfCompany: Function = (req: Request, res: Response) => {
        for (let serviceType of req.body.serviceTypes) {
            var newServiceOfCompany = new ServiceOfCompany({
                companyKey: req.body.email,
                serviceTypeId: serviceType
            });
           // ServiceOfCompany.addServiceOfCompany(newServiceOfCompany, (err: any, serviceOfCompany: any) => {});
            ServiceOfCompany.addServiceOfCompany(newServiceOfCompany);

        }
    };
}