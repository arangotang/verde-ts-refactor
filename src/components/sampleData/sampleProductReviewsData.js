interface Characteristic {
  id: number;
  value: string;
}

interface Ratings {
  [key: number]: string;
}

export interface ReviewsData {
  product_id: string;
  ratings: Ratings;
  recommended: {
    false?: string,
    true?: string,
  };
  characteristics: {
    [key: string]: Characteristic,
  };
}

const sampleProductReviewsData = {
  product_id: "40344",
  ratings: {
    1: "52",
    2: "43",
    3: "103",
    4: "102",
    5: "265",
  },
  recommended: {
    false: "136",
    true: "429",
  },
  characteristics: {
    Fit: {
      id: 135219,
      value: "3.0482315112540193",
    },
    Length: {
      id: 135220,
      value: "3.0385852090032154",
    },
    Comfort: {
      id: 135221,
      value: "3.2660256410256410",
    },
    Quality: {
      id: 135222,
      value: "3.4221556886227545",
    },
  },
};

export default sampleProductReviewsData;
