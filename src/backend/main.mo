import Text "mo:core/Text";
import Array "mo:core/Array";
import List "mo:core/List";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
  module MilestoneStatus {
    public type Value = { #locked; #completed; #unlocked };

    public func compare(status1 : Value, status2 : Value) : Order.Order {
      switch (status1, status2) {
        case (#locked, #locked) { #equal };
        case (#locked, _) { #less };
        case (#completed, #locked) { #greater };
        case (#completed, #completed) { #equal };
        case (#completed, #unlocked) { #less };
        case (#unlocked, #unlocked) { #equal };
        case (#unlocked, _) { #greater };
      };
    };
  };

  module Milestone {
    public type Milestone = {
      id : Nat;
      title : Text;
      description : Text;
      illustrationUrl : Text;
      status : MilestoneStatus.Value;
      isCompleted : Bool;
    };

    public func compare(m1 : Milestone, m2 : Milestone) : Order.Order {
      Nat.compare(m1.id, m2.id);
    };
  };

  module TechnologyJourney {
    public type TechnologyJourney = {
      milestones : [Milestone.Milestone];
    };
  };

  module Language {
    public type Value = { #english; #hindi; #marathi };

    public func compare(lang1 : Value, lang2 : Value) : Order.Order {
      switch (lang1, lang2) {
        case (#english, #english) { #equal };
        case (#english, _) { #less };
        case (#hindi, #english) { #greater };
        case (#hindi, #hindi) { #equal };
        case (#hindi, #marathi) { #less };
        case (#marathi, #marathi) { #equal };
        case (#marathi, _) { #greater };
      };
    };
  };

  module KnowledgeCategory {
    public type Value = {
      #gst;
      #digitalPayments;
      #security;
      #marketing;
      #accounting;
    };

    public func compare(category1 : Value, category2 : Value) : Order.Order {
      switch (category1, category2) {
        case (#gst, #gst) { #equal };
        case (#gst, _) { #less };
        case (#digitalPayments, #gst) { #greater };
        case (#digitalPayments, #digitalPayments) { #equal };
        case (#digitalPayments, _) { #less };
        case (#security, #accounting) { #greater };
        case (#security, #security) { #equal };
        case (#security, _) { #less };
        case (#marketing, #accounting) { #greater };
        case (#marketing, #marketing) { #equal };
        case (#marketing, #security) { #greater };
        case (#marketing, #gst) { #greater };
        case (#marketing, #digitalPayments) { #greater };
        case (#accounting, _) { #greater };
      };
    };
  };

  module KnowledgeModule {
    public type KnowledgeModule = {
      id : Text;
      title : Text;
      category : KnowledgeCategory.Value;
      tips : [{ language : Language.Value; content : Text }];
    };

    public type DirectionsModule = {
      id : Text;
      title : Text;
      tips : [{ language : Language.Value; content : Text }];
    };

    public func compare(km1 : KnowledgeModule, km2 : KnowledgeModule) : Order.Order {
      let categoryComparison = KnowledgeCategory.compare(km1.category, km2.category);
      switch (categoryComparison) { case (#equal) { Text.compare(km1.title, km2.title) }; case (order) { order } };
    };
  };

  module ChatInteraction {
    public type ChatInteraction = {
      timestamp : Int;
      userMessage : Text;
      language : Language.Value;
      responseCategory : KnowledgeCategory.Value;
      response : Text;
    };

    public func compareByTimestamp(interaction1 : ChatInteraction, interaction2 : ChatInteraction) : Order.Order {
      Int.compare(interaction1.timestamp, interaction2.timestamp);
    };
  };

  type UserProgress = {
    journey : TechnologyJourney.TechnologyJourney;
    completedMilestones : Nat;
  };

  let userProgressMap = Map.empty<Principal, UserProgress>();

  public shared ({ caller }) func initializeJourney() : async () {
    if (userProgressMap.containsKey(caller)) {
      Runtime.trap("Journey already initialized");
    };
    let initialMilestones = [
      {
        id = 1;
        title = "Create a UPI Account";
        description = "Learn how to set up your first UPI account and start accepting digital payments.";
        illustrationUrl = "https://page-ai-assets.s3.eu-central-1.amazonaws.com/branding/journey/upi_illustration.png";
        status = #unlocked;
        isCompleted = false;
      },
      {
        id = 2;
        title = "File your first GST Return";
        description = "Understand the GST filing process and submit your first return.";
        illustrationUrl = "https://page-ai-assets.s3.eu-central-1.amazonaws.com/branding/journey/gst_illustration.png";
        status = #locked;
        isCompleted = false;
      },
      {
        id = 3;
        title = "Secure your Phone";
        description = "Learn basic IT security tips to keep your device and data safe.";
        illustrationUrl = "https://page-ai-assets.s3.eu-central-1.amazonaws.com/branding/journey/secure_illustration.png";
        status = #locked;
        isCompleted = false;
      },
      {
        id = 4;
        title = "Create a WhatsApp Business Page";
        description = "Step-by-step guide to setting up your business profile on WhatsApp.";
        illustrationUrl = "https://page-ai-assets.s3.eu-central-1.amazonaws.com/branding/journey/whatsapp_illustration.png";
        status = #locked;
        isCompleted = false;
      },
      {
        id = 5;
        title = "Track your Sales Digitally";
        description = "Learn how to use digital tools to manage and track your sales.";
        illustrationUrl = "https://page-ai-assets.s3.eu-central-1.amazonaws.com/branding/journey/sales_illustration.png";
        status = #locked;
        isCompleted = false;
      },
    ];

    let milestonesList = List.fromArray<Milestone.Milestone>(initialMilestones);
    let journey : TechnologyJourney.TechnologyJourney = { milestones = milestonesList.toArray() };

    let progress : UserProgress = {
      journey;
      completedMilestones = 0;
    };

    userProgressMap.add(caller, progress);
  };

  public shared ({ caller }) func markMilestoneCompleted(milestoneId : Nat) : async () {
    switch (userProgressMap.get(caller)) {
      case (null) { Runtime.trap("Journey not initialized") };
      case (?progress) {
        let milestonesList = List.fromArray<Milestone.Milestone>(progress.journey.milestones);
        let milestones = milestonesList.toArray();

        let milestoneIndex = milestones.findIndex(
          func(m) { m.id == milestoneId }
        );

        switch (milestoneIndex) {
          case (null) { Runtime.trap("Milestone not found") };
          case (?index) {
            let milestone = milestones[index];

            if (milestone.isCompleted) {
              Runtime.trap("Milestone already completed");
            };

            let updatedMilestones = milestonesList.toArray().toVarArray<Milestone.Milestone>();
            updatedMilestones[index] := {
              id = milestone.id;
              title = milestone.title;
              description = milestone.description;
              illustrationUrl = milestone.illustrationUrl;
              status = #completed;
              isCompleted = true;
            };

            if (milestone.id < updatedMilestones.size()) {
              updatedMilestones[milestone.id] := {
                id = updatedMilestones[milestone.id].id;
                title = updatedMilestones[milestone.id].title;
                description = updatedMilestones[milestone.id].description;
                illustrationUrl = updatedMilestones[milestone.id].illustrationUrl;
                status = #unlocked;
                isCompleted = false;
              };
            };

            let updatedJourney : TechnologyJourney.TechnologyJourney = {
              milestones = updatedMilestones.toArray();
            };

            let updatedProgress : UserProgress = {
              journey = updatedJourney;
              completedMilestones = progress.completedMilestones + 1;
            };

            userProgressMap.add(caller, updatedProgress);
          };
        };
      };
    };
  };

  public query ({ caller }) func getUserJourney() : async TechnologyJourney.TechnologyJourney {
    switch (userProgressMap.get(caller)) {
      case (null) { Runtime.trap("Journey not initialized") };
      case (?progress) { progress.journey };
    };
  };
};
