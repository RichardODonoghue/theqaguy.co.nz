import Image from 'next/image';
import { technologies } from '@/constants/technologies';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Typography } from '@/components/ui/typography';

export const Technologies = () => (
  <>
    {Object.entries(technologies).map(([category, tech]) => (
      <div key={category}>
        <Typography
          variant="xl/normal"
          as="h2"
          className="text-nowrap mb-5 text-center"
        >
          {category}
        </Typography>
        <div className="grid grid-cols-3 gap-x-1 md:gap-x-0 gap-y-2 w-48 mx-auto my-5">
          {tech.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center text-center"
              data-testid={`tech-${item.name
                .toLowerCase()
                .replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-center h-16 w-16">
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src={`/technologies/${item.logo}`}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </TooltipTrigger>
                  <TooltipContent>{item.name}</TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </>
);
