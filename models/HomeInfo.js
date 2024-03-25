import mongoose from "mongoose";

const LandingSection = new mongoose.Schema(
    {
      landingImage: {
        type: String,
        required: true,
        unique: true,
      },
      landingMainTitle: {
        type: String,
        required: true,
        unique: true,
      },
      landingSecondTitle: {
        type: String,
        required: true,
        unique: true,
      }
    },
    { timestamps: true }
  );

  const HeroSection = new mongoose.Schema(
    {
      heroMainTitle: {
        type: String,
        required: true,
        default: 'Traviling opens the door to creating'
      },
      heroMainTitleHighlight: {
        type: String,
        required: true,
        default: 'memories'
      },
      heroDesc: {
        type: String,
        required: true,
        default: 'Beyond the sands and souqs, travel unlocks a treasure trove of memories. Explore the vibrant tapestry of the MEA, where every adventure becomes a story to share for generations to come. Let your journey begin.'
      }
    },
    { timestamps: true }
  );

  const Experience = new mongoose.Schema(
    {
      experienceMainTitle: {
        type: String,
        required: true,
        default: 'With Our all experience'
      },
      experienceSecondTitle: {
        type: String,
        required: true,
        default: 'we will serve you'
      },
      experienceDesc: {
        type: String,
        required: true,
        default: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
      },
      successfullTrip:{
        type: Number,
        require: true,
        default: 12
      },
      regularClients:{
        type: Number,
        require: true,
        default: 2
      },
      yearsExperience:{
        type: Number,
        require: true,
        default: 15
      }
    },
    { timestamps: true }
  );

const HomeInfoSchema = new mongoose.Schema(
    {
        landingSection: [LandingSection],
        heroSection: HeroSection,
        experience: Experience,
    },
    { timestamps: true }
);

export default mongoose.model("HomeInfo", HomeInfoSchema);
