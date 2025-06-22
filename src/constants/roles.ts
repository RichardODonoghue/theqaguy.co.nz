interface Role {
  name: string;
  description: string;
  company: string;
  dateRange: string;
}

export const roles: Role[] = [
  {
    name: "Quality Assurance Analyst | Engineer",
    description:
      "My QA Career kicked off at Enroller, a company that digitizes international student enrolments and markets schools to agents around the world. During my time at Enroller I honed my skills, learning the fundamentals of testing, CI, infrastructure and automation.",
    company: "Enroller",
    dateRange: "October 2022 - Now",
  },
  {
    name: "Field Technician",
    description:
      "Travelling around New Zealand installing and repairing IoT monitoring devices on farms and industrial sites, I sharpened my problem solving skills, one steak and cheese pie at a time.",
    company: "Levno",
    dateRange: "March 2022 - October 2022",
  },
  {
    name: "Technical Administrator | Account Manager",
    description: `During my time at Levno I developed my problem solving, critical thinking and technical skills. I also found my passion for web technology.
       I worked closely with the software and hardware teams and customers, analysing data from IoT installations, giving advice to customers and reporting issues with equipment being monitored, identifying faults in hardware and firmware.
        The skills I learned in this job were nauturally transferrable to Software Quality Assurance.`,
    company: "Levno",
    dateRange: "September 2017 - March 2022",
  },
  {
    name: "Retail Sales Assistant",
    description:
      "My first ever job. I sold smartphones, accessories and plans for broadband and mobile. I learned adaptability, communication and developed better emotional intelligence in this role.",
    company: "2degrees Mobile",
    dateRange: "November 2014 - September 2017",
  },
];
