import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Content, Container, Hero, Title } from "reactbulma";
import { getCategories, getEvents } from "./api";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between"
};

function App() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.all([getCategories(), getEvents()]).then(
      axios.spread(function(categories, events) {
        setCategories(categories.data);
        setEvents(events.data);
        setLoading(false);
      })
    );
  }, [setLoading, setCategories]);

  return (
    <>
      <Hero>
        <Hero.Body>
          <Container style={containerStyle}>
            <Title>Upcoming 5 events</Title>
            <Button primary>Create Event + </Button>
          </Container>
        </Hero.Body>
      </Hero>
      <Categories data={categories} loading={loading} events={events} />
    </>
  );
}

const Categories = ({ data = [], events = [], loading }) => {
  if (data.length < 0 || loading) {
    return (
      <Hero>
        <Hero.Body>
          <Container>
            <Title>Loading...</Title>
          </Container>
        </Hero.Body>
      </Hero>
    );
  }
  return data.map(i => (
    <Hero key={i.id}>
      <Hero.Body>
        <Container>
          <Title>{i.name}</Title>
        </Container>
      </Hero.Body>
      <Container
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridColumnGap: "3rem"
        }}
      >
        {events
          .filter(event => event.categoryId === i.id)
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
};

// const Events = () => (

// )

export default App;
