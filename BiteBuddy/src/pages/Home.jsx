import React, { useState } from "react";
import Header from "../Component/Header.jsx";
import FoodDisplay from "../Component/FoodDisplay.jsx";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div>
      <Header setSelectedCategory={setSelectedCategory} >
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
      <FoodDisplay category={selectedCategory} />
    </div>
  );
};

export default Home;
