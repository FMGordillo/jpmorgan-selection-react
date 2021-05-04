import { useState, FunctionComponent, useEffect } from "react";
import {
  Button,
  Card,
  Content,
  Container,
  Hero,
  Heading,
} from "react-bulma-components";
import { Category, Event } from "./types";
import { useData } from "./useData";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

function App() {
  const { categories, events } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categories.length > 0 && events.length > 0) setLoading(false);
  }, [categories.length, events.length]);

  return (
    <>
      <Hero>
        <Hero.Body>
          <Container style={containerStyle}>
            <Heading>Upcoming 5 events</Heading>
            <Button color="primary">Create Event + </Button>
          </Container>
        </Hero.Body>
      </Hero>
      <Categories categories={categories} loading={loading} events={events} />
    </>
  );
}
// @ts-ignore
const Categories: FunctionComponent<{
  categories: Category[];
  events: Event[];
  loading: boolean;
}> = ({ categories = [], events = [], loading }) => {
  if (categories.length < 0 || loading) {
    return (
      <Hero>
        <Hero.Body>
          <Container>
            <Heading>Loading...</Heading>
          </Container>
        </Hero.Body>
      </Hero>
    );
  } else {
    return categories.map((i) => (
      <Hero key={i.id}>
        <Hero.Body>
          <Container>
            <Heading>{i.name}</Heading>
          </Container>
        </Hero.Body>
        <Container
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridColumnGap: "3rem",
          }}
        >
          {events
            .filter((event) => event.categoryId === i.id)
            .map((event, k) => (
              <Card key={k}>
                <Card.Header>
                  <Card.Header.Title>{event.name}</Card.Header.Title>
                </Card.Header>
                <Card.Content>
                  <Content>
                    <b>Description</b>: {event.description}
                    <br />
                    <b>Location</b>: {event.location}
                    <br />
                    <b>Date</b>: {event.date}
                    <Button style={{ alignSelf: "flex-end" }}>JOIN</Button>
                  </Content>
                </Card.Content>
              </Card>
            ))}
        </Container>
      </Hero>
    ));
  }
};

export default App;
