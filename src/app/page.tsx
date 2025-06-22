import { Container } from "@/components/ui/container";
import { ContentHeader } from "@/components/ui/contentHeader";
import { Typography } from "@/components/ui/typography";

export default function Home() {
  return (
    <Container>
      <ContentHeader>HelloWorld</ContentHeader>
      <div id="hero" className="text-center p-40">
        <Typography variant="hero" className="">
          I&apos;m <span className="text-accent">Richard</span>
        </Typography>
      </div>
    </Container>
  );
}
