import { Typography } from "@/components/ui/typography";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <Container>
      <div className="text-right">
        <Typography variant="super" className="">
          <span className="text-accent">{"<"}</span>HelloWorld
          <span className="text-accent">{"/>"}</span>
        </Typography>
      </div>
    </Container>
  );
}
