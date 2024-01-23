const express = require('express')
const Job = require('../models/Job');
const { getAllJobs, getSingleJob } = require('../controllers/jobController');
const router = express.Router()

// get all jobs router 
router.get("/", getAllJobs);
// get single job router 
router.get("/single/:id", getSingleJob)

// post many jobs router
// router.post("/create", async(req, res)=>{
//     try {
//         await Job.insertMany(
//             [
//                 {
//                   "title": "Warehouse_Manager",
//                   "jobType": "Full-time",
//                   "department": "Warehouse",
//                   "vacancy": 3,
//                   "compensationAndBenefits": "Competitive salary, health insurance, retirement plan",
//                   "salary": "$50,000 - $60,000 per year",
//                   "jobContext": "Fast-paced warehouse environment",
//                   "jobResponsibilities": [
//                     "Manage inventory and logistics",
//                     "Coordinate with suppliers and vendors",
//                     "Supervise warehouse staff"
//                   ],
//                   "educationalRequirements": "Bachelor's degree in Logistics or related field",
//                   "experienceRequirements": "Minimum 3 years of warehouse management experience",
//                   "additionalRequirements": "Forklift certification is a plus",
//                   "workplace": "On-site",
//                   "jobLocation": "City XYZ",
//                   "address": "medisync - This is a dummy address -- Mirpur 1, Block-A - 1216."
//                 },
//                 {
//                   "title": "Customer_Care_Representative",
//                   "jobType": "Full-time",
//                   "department": "Customer_Care",
//                   "vacancy": 5,
//                   "compensationAndBenefits": "Competitive salary, health insurance, performance bonuses",
//                   "salary": "$40,000 - $50,000 per year",
//                   "jobContext": "Customer service and support",
//                   "jobResponsibilities": [
//                     "Handle customer inquiries and complaints",
//                     "Provide information about products and services",
//                     "Assist in resolving customer issues"
//                   ],
//                   "educationalRequirements": "High school diploma or equivalent",
//                   "experienceRequirements": "Previous customer service experience is a plus",
//                   "additionalRequirements": "Excellent communication skills",
//                   "workplace": "Office",
//                   "jobLocation": "City ABC",
//                   "address": "medisync - This is a dummy address -- Mirpur 1, Block-A - 1216."
//                 },
//                 {
//                   "title": "Technology_Specialist",
//                   "jobType": "Contract",
//                   "department": "Technology",
//                   "vacancy": 2,
//                   "compensationAndBenefits": "Hourly rate, project-based",
//                   "salary": "$60 - $80 per hour",
//                   "jobContext": "Innovative technology projects",
//                   "jobResponsibilities": [
//                     "Develop and maintain software applications",
//                     "Troubleshoot technical issues",
//                     "Collaborate with cross-functional teams"
//                   ],
//                   "educationalRequirements": "Bachelor's degree in Computer Science or related field",
//                   "experienceRequirements": "Minimum 5 years of relevant experience",
//                   "additionalRequirements": "Experience with cloud technologies is preferred",
//                   "workplace": "Remote",
//                   "jobLocation": "Anywhere",
//                   "address": "medisync - This is a dummy address -- Mirpur 1, Block-A - 1216."
//                 },
//                 {
//                   "title": "Marketing_Specialist",
//                   "jobType": "Full-time",
//                   "department": "Marketing",
//                   "vacancy": 4,
//                   "compensationAndBenefits": "Competitive salary, performance bonuses, health coverage",
//                   "salary": "$45,000 - $55,000 per year",
//                   "jobContext": "Dynamic marketing campaigns",
//                   "jobResponsibilities": [
//                     "Develop and execute marketing strategies",
//                     "Create engaging content for various channels",
//                     "Analyze market trends and competitors"
//                   ],
//                   "educationalRequirements": "Bachelor's degree in Marketing or related field",
//                   "experienceRequirements": "Minimum 3 years of marketing experience",
//                   "additionalRequirements": "Strong analytical and creative skills",
//                   "workplace": "Office",
//                   "jobLocation": "City DEF",
//                   "address": "medisync - This is a dummy address -- Mirpur 1, Block-A - 1216."
//                 },
//                 {
//                   "title": "Sales_and_Operation_Manager",
//                   "jobType": "Full-time",
//                   "department": "Sales_&_Operation",
//                   "vacancy": 2,
//                   "compensationAndBenefits": "Competitive salary, commission, health insurance",
//                   "salary": "$60,000 - $70,000 per year",
//                   "jobContext": "Manage sales and operational processes",
//                   "jobResponsibilities": [
//                     "Develop sales strategies and targets",
//                     "Coordinate with different departments",
//                     "Ensure smooth operational workflows"
//                   ],
//                   "educationalRequirements": "Bachelor's degree in Business Administration or related field",
//                   "experienceRequirements": "Minimum 5 years of relevant experience",
//                   "additionalRequirements": "Proven track record in sales management",
//                   "workplace": "On-site",
//                   "jobLocation": "City GHI",
//                   "address": "medisync - This is a dummy address -- Mirpur 1, Block-A - 1216."
//                 },
//                 {
//                   "title": "Delivery_Driver",
//                   "jobType": "Part-time",
//                   "department": "Delivery",
//                   "vacancy": 10,
//                   "compensationAndBenefits": "Hourly wage, mileage reimbursement",
//                   "salary": "$15 - $20 per hour",
//                   "jobContext": "Ensure timely and safe deliveries",
//                   "jobResponsibilities": [
//                     "Drive company vehicles for deliveries",
//                     "Inspect and maintain delivery vehicles",
//                     "Handle customer inquiries during deliveries"
//                   ],
//                   "educationalRequirements": "High school diploma or equivalent",
//                   "experienceRequirements": "Valid driver's license with a clean driving record",
//                   "additionalRequirements": "Good knowledge of local routes",
//                   "workplace": "On the road",
//                   "jobLocation": "City JKL",
//                   "address": "medisync - This is a dummy address -- Mirpur 1, Block-A - 1216."
//                 },
//                 {
//                   "title": "Health_and_Beauty_Specialist",
//                   "jobType": "Full-time",
//                   "department": "Health_&_Beauty",
//                   "vacancy": 3,
//                   "compensationAndBenefits": "Competitive salary, health insurance, wellness programs",
//                   "salary": "$55,000 - $65,000 per year",
//                   "jobContext": "Promote health and beauty products",
//                   "jobResponsibilities": [
//                     "Develop marketing strategies for beauty products",
//                     "Provide expert advice on health and wellness",
//                     "Collaborate with vendors and suppliers"
//                   ],
//                   "educationalRequirements": "Bachelor's degree in Health Sciences or related field",
//                   "experienceRequirements": "Minimum 4 years of experience in health and beauty industry",
//                   "additionalRequirements": "Certification in beauty or wellness is a plus",
//                   "workplace": "Office",
//                   "jobLocation": "City MNO",
//                   "address": "medisync - This is a dummy address -- Mirpur 1, Block-A - 1216."
//                 },
//                 {
//                   "title": "Corporate_Affairs_Manager",
//                   "jobType": "Full-time",
//                   "department": "Corporate_Affairs",
//                   "vacancy": 2,
//                   "compensationAndBenefits": "Competitive salary, benefits package, stock options",
//                   "salary": "$70,000 - $80,000 per year",
//                   "jobContext": "Manage corporate communications and public relations",
//                   "jobResponsibilities": [
//                     "Develop and implement corporate communication strategies",
//                     "Handle media relations and public affairs",
//                     "Coordinate internal and external events"
//                   ],
//                   "educationalRequirements": "Bachelor's degree in Public Relations or related field",
//                   "experienceRequirements": "Minimum 6 years of corporate affairs or public relations experience",
//                   "additionalRequirements": "Excellent written and verbal communication skills",
//                   "workplace": "Office",
//                   "jobLocation": "City PQR",
//                   "address": "medisync - This is a dummy address -- Mirpur 1, Block-A - 1216."
//                 }
//               ]
//         )
//         res.status(201).json({
//             status: true,
//             message: "jobs data inserted successfully"
//         })
        
//     } catch (err) {
//         res.status(500).json({
//             status: false,
//             message: err.message
//         })
//     }
// });


module.exports = router