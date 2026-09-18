import type { CategoryId } from "../src/lib/categories.ts";

export const CATALOG_SEED = "fsb-catalog-v1";
export const EXPECTED_CATEGORY_TOTALS = {
  home: 100, kitchen: 100, office: 80, lighting: 80, bags: 80, outdoor: 80,
} as const;

interface Configuration {
  readonly key: string;
  readonly label: string;
  readonly priceCents: number;
}

export interface FamilyDefinition {
  readonly key: string;
  readonly category: CategoryId;
  readonly title: string;
  readonly attribute: string;
  readonly description: string;
  readonly reviewNotes: readonly [string, string, string];
  readonly configurations: readonly Configuration[];
}

/** Explicitly allowed configurations: no arbitrary attribute cross-product. */
export const FAMILIES = [
  {
    "key": "woven-basket",
    "reviewNotes": ["The handle makes it easy to lift from the shelf.", "Small items are easier to find in the open top.", "The weave catches on loose threads."],
    "category": "home",
    "title": "Handled Woven Basket",
    "attribute": "width",
    "description": "A curved handle sits above an open woven basket. Use it to gather household items; the contents in the photograph are not included.",
    "configurations": [
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 1200
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 1290
      },
      {
        "key": "26-cm",
        "label": "26 cm",
        "priceCents": 1380
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 1470
      },
      {
        "key": "34-cm",
        "label": "34 cm",
        "priceCents": 1560
      },
      {
        "key": "38-cm",
        "label": "38 cm",
        "priceCents": 1650
      },
      {
        "key": "42-cm",
        "label": "42 cm",
        "priceCents": 1740
      },
      {
        "key": "46-cm",
        "label": "46 cm",
        "priceCents": 1830
      },
      {
        "key": "50-cm",
        "label": "50 cm",
        "priceCents": 1920
      },
      {
        "key": "54-cm",
        "label": "54 cm",
        "priceCents": 2010
      }
    ]
  },
  {
    "key": "ceramic-vase",
    "reviewNotes": ["A few stems sit well in the opening.", "The pattern is clearly visible from across the table.", "The shoulder takes up more space than the opening suggests."],
    "category": "home",
    "title": "Patterned Ceramic Vase",
    "attribute": "height",
    "description": "A patterned ceramic vessel for cut stems on a table or shelf. The broad shoulder gives a small arrangement room to spread.",
    "configurations": [
      {
        "key": "10-cm",
        "label": "10 cm",
        "priceCents": 900
      },
      {
        "key": "12-cm",
        "label": "12 cm",
        "priceCents": 1010
      },
      {
        "key": "14-cm",
        "label": "14 cm",
        "priceCents": 1120
      },
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 1230
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 1340
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 1450
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 1560
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 1670
      },
      {
        "key": "26-cm",
        "label": "26 cm",
        "priceCents": 1780
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 1890
      }
    ]
  },
  {
    "key": "picture-frame",
    "reviewNotes": ["The wooden edge works well around a small photograph.", "I measured my print first and the fit was right.", "The uneven outer edge makes a tightly spaced arrangement difficult."],
    "category": "home",
    "title": "Wooden Picture Frame",
    "attribute": "print",
    "description": "An irregular wooden surround holds a single photograph. Choose by print size rather than the outer frame dimensions.",
    "configurations": [
      {
        "key": "9-13-cm",
        "label": "9 × 13 cm",
        "priceCents": 800
      },
      {
        "key": "10-15-cm",
        "label": "10 × 15 cm",
        "priceCents": 960
      },
      {
        "key": "13-18-cm",
        "label": "13 × 18 cm",
        "priceCents": 1120
      },
      {
        "key": "15-20-cm",
        "label": "15 × 20 cm",
        "priceCents": 1280
      },
      {
        "key": "18-24-cm",
        "label": "18 × 24 cm",
        "priceCents": 1440
      },
      {
        "key": "20-25-cm",
        "label": "20 × 25 cm",
        "priceCents": 1600
      },
      {
        "key": "20-30-cm",
        "label": "20 × 30 cm",
        "priceCents": 1760
      },
      {
        "key": "21-30-cm",
        "label": "21 × 30 cm",
        "priceCents": 1920
      },
      {
        "key": "24-30-cm",
        "label": "24 × 30 cm",
        "priceCents": 2080
      },
      {
        "key": "30-40-cm",
        "label": "30 × 40 cm",
        "priceCents": 2240
      }
    ]
  },
  {
    "key": "cushion",
    "reviewNotes": ["It adds some support to my reading chair.", "The pattern is easy to see against a plain seat.", "It occupies more of the seat than I expected."],
    "category": "home",
    "title": "Patterned Cushion",
    "attribute": "width",
    "description": "A patterned cushion for an indoor chair or bench. Spot-clean small marks and keep away from damp outdoor surfaces.",
    "configurations": [
      {
        "key": "25-cm",
        "label": "25 cm",
        "priceCents": 1000
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 1070
      },
      {
        "key": "35-cm",
        "label": "35 cm",
        "priceCents": 1140
      },
      {
        "key": "40-cm",
        "label": "40 cm",
        "priceCents": 1210
      },
      {
        "key": "45-cm",
        "label": "45 cm",
        "priceCents": 1280
      },
      {
        "key": "50-cm",
        "label": "50 cm",
        "priceCents": 1350
      },
      {
        "key": "55-cm",
        "label": "55 cm",
        "priceCents": 1420
      },
      {
        "key": "60-cm",
        "label": "60 cm",
        "priceCents": 1490
      },
      {
        "key": "65-cm",
        "label": "65 cm",
        "priceCents": 1560
      },
      {
        "key": "70-cm",
        "label": "70 cm",
        "priceCents": 1630
      }
    ]
  },
  {
    "key": "throw",
    "reviewNotes": ["It folds neatly over the sofa arm.", "The light weave is useful for a cool evening indoors.", "I wanted more warmth than this light layer provides."],
    "category": "home",
    "title": "Cotton Throw",
    "attribute": "size",
    "description": "A lightweight woven layer for a sofa or the foot of a bed. Fold it over an armrest when it is not in use.",
    "configurations": [
      {
        "key": "80-120-cm",
        "label": "80 × 120 cm",
        "priceCents": 1600
      },
      {
        "key": "90-130-cm",
        "label": "90 × 130 cm",
        "priceCents": 1780
      },
      {
        "key": "100-140-cm",
        "label": "100 × 140 cm",
        "priceCents": 1960
      },
      {
        "key": "110-150-cm",
        "label": "110 × 150 cm",
        "priceCents": 2140
      },
      {
        "key": "120-160-cm",
        "label": "120 × 160 cm",
        "priceCents": 2320
      },
      {
        "key": "130-170-cm",
        "label": "130 × 170 cm",
        "priceCents": 2500
      },
      {
        "key": "140-180-cm",
        "label": "140 × 180 cm",
        "priceCents": 2680
      },
      {
        "key": "150-190-cm",
        "label": "150 × 190 cm",
        "priceCents": 2860
      },
      {
        "key": "160-200-cm",
        "label": "160 × 200 cm",
        "priceCents": 3040
      },
      {
        "key": "180-220-cm",
        "label": "180 × 220 cm",
        "priceCents": 3220
      }
    ]
  },
  {
    "key": "doormat",
    "reviewNotes": ["The coarse surface takes loose dirt off my shoes.", "Shaking it outside removes most of the grit.", "Loose fibres need sweeping up around the mat."],
    "category": "home",
    "title": "Coir Entrance Mat",
    "attribute": "size",
    "description": "The coarse surface brushes loose dirt from shoes. Use in a covered entrance and shake out collected grit.",
    "configurations": [
      {
        "key": "30-45-cm",
        "label": "30 × 45 cm",
        "priceCents": 900
      },
      {
        "key": "35-50-cm",
        "label": "35 × 50 cm",
        "priceCents": 1080
      },
      {
        "key": "40-60-cm",
        "label": "40 × 60 cm",
        "priceCents": 1260
      },
      {
        "key": "45-65-cm",
        "label": "45 × 65 cm",
        "priceCents": 1440
      },
      {
        "key": "50-70-cm",
        "label": "50 × 70 cm",
        "priceCents": 1620
      },
      {
        "key": "55-80-cm",
        "label": "55 × 80 cm",
        "priceCents": 1800
      },
      {
        "key": "60-90-cm",
        "label": "60 × 90 cm",
        "priceCents": 1980
      },
      {
        "key": "65-100-cm",
        "label": "65 × 100 cm",
        "priceCents": 2160
      },
      {
        "key": "70-110-cm",
        "label": "70 × 110 cm",
        "priceCents": 2340
      },
      {
        "key": "80-120-cm",
        "label": "80 × 120 cm",
        "priceCents": 2520
      }
    ]
  },
  {
    "key": "wall-clock",
    "reviewNotes": ["The dial is easy to read from my desk.", "The clear numerals help when checking the time quickly.", "I should have measured the free wall space first."],
    "category": "home",
    "title": "Round Wall Clock",
    "attribute": "diameter",
    "description": "A round dial makes the time easy to check across a room. Choose a diameter that leaves space around the clock on the wall.",
    "configurations": [
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 1500
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 1600
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 1700
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 1800
      },
      {
        "key": "26-cm",
        "label": "26 cm",
        "priceCents": 1900
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 2000
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 2100
      },
      {
        "key": "32-cm",
        "label": "32 cm",
        "priceCents": 2200
      },
      {
        "key": "35-cm",
        "label": "35 cm",
        "priceCents": 2300
      },
      {
        "key": "40-cm",
        "label": "40 cm",
        "priceCents": 2400
      }
    ]
  },
  {
    "key": "candle-holder",
    "reviewNotes": ["One candle sits neatly in the holder.", "It takes little space on a cleared table.", "I had to check my candle size before using it."],
    "category": "home",
    "title": "Single Candle Holder",
    "attribute": "height",
    "description": "Holds one candle on a stable, level surface. Keep lit candles away from curtains and other loose textiles.",
    "configurations": [
      {
        "key": "8-cm",
        "label": "8 cm",
        "priceCents": 700
      },
      {
        "key": "10-cm",
        "label": "10 cm",
        "priceCents": 800
      },
      {
        "key": "12-cm",
        "label": "12 cm",
        "priceCents": 900
      },
      {
        "key": "14-cm",
        "label": "14 cm",
        "priceCents": 1000
      },
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 1100
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 1200
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 1300
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 1400
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 1500
      },
      {
        "key": "26-cm",
        "label": "26 cm",
        "priceCents": 1600
      }
    ]
  },
  {
    "key": "storage-box",
    "reviewNotes": ["It keeps the small items on my shelf together.", "The lid means I can move it without things spilling out.", "Opening the lid needs more clearance than I allowed."],
    "category": "home",
    "title": "Lidded Storage Box",
    "attribute": "capacity",
    "description": "A removable lid keeps loose items together between uses. Allow enough shelf clearance to lift the lid.",
    "configurations": [
      {
        "key": "2-l",
        "label": "2 L",
        "priceCents": 700
      },
      {
        "key": "3-l",
        "label": "3 L",
        "priceCents": 880
      },
      {
        "key": "4-l",
        "label": "4 L",
        "priceCents": 1060
      },
      {
        "key": "5-l",
        "label": "5 L",
        "priceCents": 1240
      },
      {
        "key": "6-l",
        "label": "6 L",
        "priceCents": 1420
      },
      {
        "key": "8-l",
        "label": "8 L",
        "priceCents": 1600
      },
      {
        "key": "10-l",
        "label": "10 L",
        "priceCents": 1780
      },
      {
        "key": "12-l",
        "label": "12 L",
        "priceCents": 1960
      },
      {
        "key": "15-l",
        "label": "15 L",
        "priceCents": 2140
      },
      {
        "key": "18-l",
        "label": "18 L",
        "priceCents": 2320
      }
    ]
  },
  {
    "key": "plant-pot",
    "reviewNotes": ["The clay surface suits the plants on my windowsill.", "It is straightforward to move with both hands.", "The soil dries out sooner than in my glazed pots."],
    "category": "home",
    "title": "Terracotta Plant Pot",
    "attribute": "diameter",
    "description": "Unglazed clay gives this pot a porous surface. Place a saucer underneath when watering indoors.",
    "configurations": [
      {
        "key": "8-cm",
        "label": "8 cm",
        "priceCents": 400
      },
      {
        "key": "10-cm",
        "label": "10 cm",
        "priceCents": 470
      },
      {
        "key": "12-cm",
        "label": "12 cm",
        "priceCents": 540
      },
      {
        "key": "14-cm",
        "label": "14 cm",
        "priceCents": 610
      },
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 680
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 750
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 820
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 890
      },
      {
        "key": "25-cm",
        "label": "25 cm",
        "priceCents": 960
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 1030
      }
    ]
  },
  {
    "key": "mug",
    "reviewNotes": ["The handle leaves room for my fingers.", "The capacity suits my usual cup of tea.", "Filling it near the rim makes it awkward to carry."],
    "category": "kitchen",
    "title": "Ceramic Mug",
    "attribute": "capacity",
    "description": "A handled mug for tea, coffee or warm milk. The listed volume helps match it to your usual serving.",
    "configurations": [
      {
        "key": "180-ml",
        "label": "180 ml",
        "priceCents": 500
      },
      {
        "key": "220-ml",
        "label": "220 ml",
        "priceCents": 580
      },
      {
        "key": "250-ml",
        "label": "250 ml",
        "priceCents": 660
      },
      {
        "key": "280-ml",
        "label": "280 ml",
        "priceCents": 740
      },
      {
        "key": "300-ml",
        "label": "300 ml",
        "priceCents": 820
      },
      {
        "key": "330-ml",
        "label": "330 ml",
        "priceCents": 900
      },
      {
        "key": "350-ml",
        "label": "350 ml",
        "priceCents": 980
      },
      {
        "key": "380-ml",
        "label": "380 ml",
        "priceCents": 1060
      },
      {
        "key": "400-ml",
        "label": "400 ml",
        "priceCents": 1140
      },
      {
        "key": "450-ml",
        "label": "450 ml",
        "priceCents": 1220
      }
    ]
  },
  {
    "key": "bowl",
    "reviewNotes": ["It works well for a side dish at the table.", "The open shape is easy to wash by hand.", "It takes more cupboard space than a straight-sided bowl."],
    "category": "kitchen",
    "title": "Serving Bowl",
    "attribute": "diameter",
    "description": "An open bowl for serving at the table. Smaller sizes suit side dishes; wider sizes leave room for shared portions.",
    "configurations": [
      {
        "key": "10-cm",
        "label": "10 cm",
        "priceCents": 600
      },
      {
        "key": "12-cm",
        "label": "12 cm",
        "priceCents": 700
      },
      {
        "key": "14-cm",
        "label": "14 cm",
        "priceCents": 800
      },
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 900
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 1000
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 1100
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 1200
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 1300
      },
      {
        "key": "26-cm",
        "label": "26 cm",
        "priceCents": 1400
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 1500
      }
    ]
  },
  {
    "key": "plate",
    "reviewNotes": ["The blue pattern works with my plain table linen.", "The rim gives me a place to hold it when carrying food.", "The patterned rim leaves less flat space for food."],
    "category": "kitchen",
    "title": "Blue Pattern Dinner Plate",
    "attribute": "diameter",
    "description": "A blue patterned plate for a table setting. Check cupboard depth before choosing a larger diameter.",
    "configurations": [
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 500
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 600
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 700
      },
      {
        "key": "21-cm",
        "label": "21 cm",
        "priceCents": 800
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 900
      },
      {
        "key": "23-cm",
        "label": "23 cm",
        "priceCents": 1000
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 1100
      },
      {
        "key": "25-cm",
        "label": "25 cm",
        "priceCents": 1200
      },
      {
        "key": "27-cm",
        "label": "27 cm",
        "priceCents": 1300
      },
      {
        "key": "29-cm",
        "label": "29 cm",
        "priceCents": 1400
      }
    ]
  },
  {
    "key": "board",
    "reviewNotes": ["The flat surface gives me enough room for vegetables.", "Standing it on its edge helps both sides dry.", "It needs more care after washing than my plastic board."],
    "category": "kitchen",
    "title": "Wooden Chopping Board",
    "attribute": "size",
    "description": "A flat wooden board provides a surface for everyday preparation. Hand-wash and dry upright; do not leave it soaking.",
    "configurations": [
      {
        "key": "20-15-cm",
        "label": "20 × 15 cm",
        "priceCents": 1000
      },
      {
        "key": "24-18-cm",
        "label": "24 × 18 cm",
        "priceCents": 1200
      },
      {
        "key": "28-20-cm",
        "label": "28 × 20 cm",
        "priceCents": 1400
      },
      {
        "key": "30-22-cm",
        "label": "30 × 22 cm",
        "priceCents": 1600
      },
      {
        "key": "32-24-cm",
        "label": "32 × 24 cm",
        "priceCents": 1800
      },
      {
        "key": "35-25-cm",
        "label": "35 × 25 cm",
        "priceCents": 2000
      },
      {
        "key": "38-28-cm",
        "label": "38 × 28 cm",
        "priceCents": 2200
      },
      {
        "key": "40-30-cm",
        "label": "40 × 30 cm",
        "priceCents": 2400
      },
      {
        "key": "45-32-cm",
        "label": "45 × 32 cm",
        "priceCents": 2600
      },
      {
        "key": "50-35-cm",
        "label": "50 × 35 cm",
        "priceCents": 2800
      }
    ]
  },
  {
    "key": "saucepan",
    "reviewNotes": ["The handle is useful when pouring a small portion.", "It is a handy shape for heating sauces.", "It feels heavy when filled close to the top."],
    "category": "kitchen",
    "title": "Saucepan",
    "attribute": "capacity",
    "description": "A handled pan for heating sauces and small portions. Match the base to a suitable hob ring and use a trivet when serving.",
    "configurations": [
      {
        "key": "0-8-l",
        "label": "0.8 L",
        "priceCents": 1500
      },
      {
        "key": "1-l",
        "label": "1 L",
        "priceCents": 1800
      },
      {
        "key": "1-2-l",
        "label": "1.2 L",
        "priceCents": 2100
      },
      {
        "key": "1-5-l",
        "label": "1.5 L",
        "priceCents": 2400
      },
      {
        "key": "1-8-l",
        "label": "1.8 L",
        "priceCents": 2700
      },
      {
        "key": "2-l",
        "label": "2 L",
        "priceCents": 3000
      },
      {
        "key": "2-5-l",
        "label": "2.5 L",
        "priceCents": 3300
      },
      {
        "key": "3-l",
        "label": "3 L",
        "priceCents": 3600
      },
      {
        "key": "3-5-l",
        "label": "3.5 L",
        "priceCents": 3900
      },
      {
        "key": "4-l",
        "label": "4 L",
        "priceCents": 4200
      }
    ]
  },
  {
    "key": "frying-pan",
    "reviewNotes": ["The shallow sides leave room to turn food.", "The cooking surface suits the portions I make.", "Food gets crowded if I try to cook too much at once."],
    "category": "kitchen",
    "title": "Frying Pan",
    "attribute": "diameter",
    "description": "A shallow pan with an open cooking surface. Choose the diameter to suit the amount of food and your hob.",
    "configurations": [
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 1400
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 1620
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 1840
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 2060
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 2280
      },
      {
        "key": "26-cm",
        "label": "26 cm",
        "priceCents": 2500
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 2720
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 2940
      },
      {
        "key": "32-cm",
        "label": "32 cm",
        "priceCents": 3160
      },
      {
        "key": "34-cm",
        "label": "34 cm",
        "priceCents": 3380
      }
    ]
  },
  {
    "key": "kettle",
    "reviewNotes": ["The spout makes it easy to direct water into a mug.", "The handle gives me a clear place to grip it.", "A full kettle is heavier to pour than I expected."],
    "category": "kitchen",
    "title": "Stovetop Kettle",
    "attribute": "capacity",
    "description": "A kettle for heating water on a compatible stovetop. Fill below the spout and use care when handling hot surfaces.",
    "configurations": [
      {
        "key": "0-6-l",
        "label": "0.6 L",
        "priceCents": 1700
      },
      {
        "key": "0-8-l",
        "label": "0.8 L",
        "priceCents": 1950
      },
      {
        "key": "1-l",
        "label": "1 L",
        "priceCents": 2200
      },
      {
        "key": "1-2-l",
        "label": "1.2 L",
        "priceCents": 2450
      },
      {
        "key": "1-4-l",
        "label": "1.4 L",
        "priceCents": 2700
      },
      {
        "key": "1-6-l",
        "label": "1.6 L",
        "priceCents": 2950
      },
      {
        "key": "1-8-l",
        "label": "1.8 L",
        "priceCents": 3200
      },
      {
        "key": "2-l",
        "label": "2 L",
        "priceCents": 3450
      },
      {
        "key": "2-5-l",
        "label": "2.5 L",
        "priceCents": 3700
      },
      {
        "key": "3-l",
        "label": "3 L",
        "priceCents": 3950
      }
    ]
  },
  {
    "key": "colander",
    "reviewNotes": ["Water drains readily when I hold it over the sink.", "The side handles help when rinsing vegetables.", "Small grains fall through the holes."],
    "category": "kitchen",
    "title": "Kitchen Colander",
    "attribute": "diameter",
    "description": "Drain rinsed vegetables or cooked pasta over a sink. Leave space underneath so water can run away freely.",
    "configurations": [
      {
        "key": "14-cm",
        "label": "14 cm",
        "priceCents": 600
      },
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 700
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 800
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 900
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 1000
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 1100
      },
      {
        "key": "26-cm",
        "label": "26 cm",
        "priceCents": 1200
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 1300
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 1400
      },
      {
        "key": "32-cm",
        "label": "32 cm",
        "priceCents": 1500
      }
    ]
  },
  {
    "key": "jar",
    "reviewNotes": ["I can see what is left without opening it.", "It keeps my dry ingredients in one place.", "The glass adds weight on a crowded shelf."],
    "category": "kitchen",
    "title": "Glass Storage Jar",
    "attribute": "capacity",
    "description": "A clear jar keeps dry ingredients visible. Wash and dry it fully before filling; food shown in the photograph is not included.",
    "configurations": [
      {
        "key": "150-ml",
        "label": "150 ml",
        "priceCents": 400
      },
      {
        "key": "200-ml",
        "label": "200 ml",
        "priceCents": 470
      },
      {
        "key": "250-ml",
        "label": "250 ml",
        "priceCents": 540
      },
      {
        "key": "350-ml",
        "label": "350 ml",
        "priceCents": 610
      },
      {
        "key": "500-ml",
        "label": "500 ml",
        "priceCents": 680
      },
      {
        "key": "650-ml",
        "label": "650 ml",
        "priceCents": 750
      },
      {
        "key": "750-ml",
        "label": "750 ml",
        "priceCents": 820
      },
      {
        "key": "1000-ml",
        "label": "1000 ml",
        "priceCents": 890
      },
      {
        "key": "1250-ml",
        "label": "1250 ml",
        "priceCents": 960
      },
      {
        "key": "1500-ml",
        "label": "1500 ml",
        "priceCents": 1030
      }
    ]
  },
  {
    "key": "spoon",
    "reviewNotes": ["The wooden edge is useful for stirring sauce.", "It is easy to rinse immediately after cooking.", "Strongly coloured food has marked the wood."],
    "category": "kitchen",
    "title": "Wooden Cooking Spoon",
    "attribute": "length",
    "description": "A wooden spoon for mixing and stirring. Hand-wash after use and let it dry before putting it away.",
    "configurations": [
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 300
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 350
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 400
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 450
      },
      {
        "key": "26-cm",
        "label": "26 cm",
        "priceCents": 500
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 550
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 600
      },
      {
        "key": "32-cm",
        "label": "32 cm",
        "priceCents": 650
      },
      {
        "key": "35-cm",
        "label": "35 cm",
        "priceCents": 700
      },
      {
        "key": "38-cm",
        "label": "38 cm",
        "priceCents": 750
      }
    ]
  },
  {
    "key": "notebook",
    "reviewNotes": ["The ruled pages help keep my notes aligned.", "The page count suits the project I bought it for.", "It takes up more bag space than loose sheets."],
    "category": "office",
    "title": "Ruled Notebook",
    "attribute": "pages",
    "description": "Ruled pages give handwritten notes a consistent baseline. Choose a page count for a short project or a longer course.",
    "configurations": [
      {
        "key": "48-pages",
        "label": "48 pages",
        "priceCents": 300
      },
      {
        "key": "64-pages",
        "label": "64 pages",
        "priceCents": 360
      },
      {
        "key": "80-pages",
        "label": "80 pages",
        "priceCents": 420
      },
      {
        "key": "96-pages",
        "label": "96 pages",
        "priceCents": 480
      },
      {
        "key": "120-pages",
        "label": "120 pages",
        "priceCents": 540
      },
      {
        "key": "144-pages",
        "label": "144 pages",
        "priceCents": 600
      },
      {
        "key": "160-pages",
        "label": "160 pages",
        "priceCents": 660
      },
      {
        "key": "192-pages",
        "label": "192 pages",
        "priceCents": 720
      },
      {
        "key": "240-pages",
        "label": "240 pages",
        "priceCents": 780
      },
      {
        "key": "288-pages",
        "label": "288 pages",
        "priceCents": 840
      }
    ]
  },
  {
    "key": "pencil",
    "reviewNotes": ["The graphite is useful for notes that need correcting.", "Having a few spares saves looking for a pencil.", "I need a sharpener nearby during longer sessions."],
    "category": "office",
    "title": "Graphite Pencil Set",
    "attribute": "pack",
    "description": "Wood-cased graphite pencils for notes and sketches. The set quantity is listed explicitly; a sharpener is not included.",
    "configurations": [
      {
        "key": "2-pencils",
        "label": "2 pencils",
        "priceCents": 300
      },
      {
        "key": "3-pencils",
        "label": "3 pencils",
        "priceCents": 340
      },
      {
        "key": "4-pencils",
        "label": "4 pencils",
        "priceCents": 380
      },
      {
        "key": "6-pencils",
        "label": "6 pencils",
        "priceCents": 420
      },
      {
        "key": "8-pencils",
        "label": "8 pencils",
        "priceCents": 460
      },
      {
        "key": "10-pencils",
        "label": "10 pencils",
        "priceCents": 500
      },
      {
        "key": "12-pencils",
        "label": "12 pencils",
        "priceCents": 540
      },
      {
        "key": "16-pencils",
        "label": "16 pencils",
        "priceCents": 580
      },
      {
        "key": "20-pencils",
        "label": "20 pencils",
        "priceCents": 620
      },
      {
        "key": "24-pencils",
        "label": "24 pencils",
        "priceCents": 660
      }
    ]
  },
  {
    "key": "pen",
    "reviewNotes": ["I keep one on the desk and one in my bag.", "The cap protects the point when I put it away.", "The pack has no spare ink refills."],
    "category": "office",
    "title": "Ballpoint Pen Set",
    "attribute": "pack",
    "description": "A set of everyday ballpoint pens for a desk or shared stationery drawer. Keep a spare where you usually take notes.",
    "configurations": [
      {
        "key": "2-pens",
        "label": "2 pens",
        "priceCents": 300
      },
      {
        "key": "3-pens",
        "label": "3 pens",
        "priceCents": 345
      },
      {
        "key": "4-pens",
        "label": "4 pens",
        "priceCents": 390
      },
      {
        "key": "5-pens",
        "label": "5 pens",
        "priceCents": 435
      },
      {
        "key": "6-pens",
        "label": "6 pens",
        "priceCents": 480
      },
      {
        "key": "8-pens",
        "label": "8 pens",
        "priceCents": 525
      },
      {
        "key": "10-pens",
        "label": "10 pens",
        "priceCents": 570
      },
      {
        "key": "12-pens",
        "label": "12 pens",
        "priceCents": 615
      },
      {
        "key": "16-pens",
        "label": "16 pens",
        "priceCents": 660
      },
      {
        "key": "20-pens",
        "label": "20 pens",
        "priceCents": 705
      }
    ]
  },
  {
    "key": "ruler",
    "reviewNotes": ["The markings are useful for small paper layouts.", "The straight edge helps with ruled lines.", "The length does not fit my usual pencil case."],
    "category": "office",
    "title": "30 cm Ruler Set",
    "attribute": "pack",
    "description": "Straight 30 cm rulers for paper layouts and desk work. Pack quantities suit individual desks or shared stationery supplies.",
    "configurations": [
      {
        "key": "1-rulers",
        "label": "1 rulers",
        "priceCents": 300
      },
      {
        "key": "2-rulers",
        "label": "2 rulers",
        "priceCents": 340
      },
      {
        "key": "3-rulers",
        "label": "3 rulers",
        "priceCents": 380
      },
      {
        "key": "4-rulers",
        "label": "4 rulers",
        "priceCents": 420
      },
      {
        "key": "5-rulers",
        "label": "5 rulers",
        "priceCents": 460
      },
      {
        "key": "6-rulers",
        "label": "6 rulers",
        "priceCents": 500
      },
      {
        "key": "8-rulers",
        "label": "8 rulers",
        "priceCents": 540
      },
      {
        "key": "10-rulers",
        "label": "10 rulers",
        "priceCents": 580
      },
      {
        "key": "12-rulers",
        "label": "12 rulers",
        "priceCents": 620
      },
      {
        "key": "16-rulers",
        "label": "16 rulers",
        "priceCents": 660
      }
    ]
  },
  {
    "key": "scissors",
    "reviewNotes": ["The pointed blades help with small paper cuts.", "They work for the light craft tasks on my desk.", "I would use a different pair for thick fabric."],
    "category": "office",
    "title": "Desk Scissors",
    "attribute": "length",
    "description": "A pair of scissors for paper and light craft materials. Store with the blades closed and away from children.",
    "configurations": [
      {
        "key": "12-cm",
        "label": "12 cm",
        "priceCents": 400
      },
      {
        "key": "13-cm",
        "label": "13 cm",
        "priceCents": 460
      },
      {
        "key": "14-cm",
        "label": "14 cm",
        "priceCents": 520
      },
      {
        "key": "15-cm",
        "label": "15 cm",
        "priceCents": 580
      },
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 640
      },
      {
        "key": "17-cm",
        "label": "17 cm",
        "priceCents": 700
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 760
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 820
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 880
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 940
      }
    ]
  },
  {
    "key": "stapler",
    "reviewNotes": ["It keeps short documents together without a binder.", "The base sits flat on my desk.", "Thicker paper makes the stated sheet count harder to reach."],
    "category": "office",
    "title": "Desktop Stapler",
    "attribute": "capacity",
    "description": "Keeps short paper documents together at the corner. Stated capacity assumes ordinary office paper.",
    "configurations": [
      {
        "key": "10-sheets",
        "label": "10 sheets",
        "priceCents": 600
      },
      {
        "key": "12-sheets",
        "label": "12 sheets",
        "priceCents": 680
      },
      {
        "key": "15-sheets",
        "label": "15 sheets",
        "priceCents": 760
      },
      {
        "key": "18-sheets",
        "label": "18 sheets",
        "priceCents": 840
      },
      {
        "key": "20-sheets",
        "label": "20 sheets",
        "priceCents": 920
      },
      {
        "key": "22-sheets",
        "label": "22 sheets",
        "priceCents": 1000
      },
      {
        "key": "25-sheets",
        "label": "25 sheets",
        "priceCents": 1080
      },
      {
        "key": "28-sheets",
        "label": "28 sheets",
        "priceCents": 1160
      },
      {
        "key": "30-sheets",
        "label": "30 sheets",
        "priceCents": 1240
      },
      {
        "key": "35-sheets",
        "label": "35 sheets",
        "priceCents": 1320
      }
    ]
  },
  {
    "key": "binder",
    "reviewNotes": ["The spine makes it easy to find papers on the shelf.", "I can move documents around without losing their order.", "Unpunched sheets need separate sleeves."],
    "category": "office",
    "title": "Ring Binder",
    "attribute": "spine",
    "description": "A ring binder keeps punched papers in order. Choose the spine width for the amount of paperwork you expect to store.",
    "configurations": [
      {
        "key": "15-mm",
        "label": "15 mm",
        "priceCents": 400
      },
      {
        "key": "20-mm",
        "label": "20 mm",
        "priceCents": 470
      },
      {
        "key": "25-mm",
        "label": "25 mm",
        "priceCents": 540
      },
      {
        "key": "30-mm",
        "label": "30 mm",
        "priceCents": 610
      },
      {
        "key": "35-mm",
        "label": "35 mm",
        "priceCents": 680
      },
      {
        "key": "40-mm",
        "label": "40 mm",
        "priceCents": 750
      },
      {
        "key": "45-mm",
        "label": "45 mm",
        "priceCents": 820
      },
      {
        "key": "50-mm",
        "label": "50 mm",
        "priceCents": 890
      },
      {
        "key": "60-mm",
        "label": "60 mm",
        "priceCents": 960
      },
      {
        "key": "65-mm",
        "label": "65 mm",
        "priceCents": 1030
      }
    ]
  },
  {
    "key": "pencil-case",
    "reviewNotes": ["The zip keeps small stationery together in my bag.", "Pens are easier to find than when loose in a drawer.", "A bulky sharpener leaves less room for long pencils."],
    "category": "office",
    "title": "Zip Pencil Case",
    "attribute": "length",
    "description": "A zipped case gathers small stationery items in one place. Check the length against your longest pen or pencil.",
    "configurations": [
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 500
      },
      {
        "key": "17-cm",
        "label": "17 cm",
        "priceCents": 560
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 620
      },
      {
        "key": "19-cm",
        "label": "19 cm",
        "priceCents": 680
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 740
      },
      {
        "key": "21-cm",
        "label": "21 cm",
        "priceCents": 800
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 860
      },
      {
        "key": "23-cm",
        "label": "23 cm",
        "priceCents": 920
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 980
      },
      {
        "key": "25-cm",
        "label": "25 cm",
        "priceCents": 1040
      }
    ]
  },
  {
    "key": "desk-lamp",
    "reviewNotes": ["I can aim the light away from my writing hand.", "The arm adjustment helps position the light on the page.", "It needs clear space behind the base to adjust."],
    "category": "lighting",
    "title": "Adjustable Desk Lamp",
    "attribute": "height",
    "description": "A directed light for reading and desk tasks. Position it to one side of your work to reduce shadows from your hand.",
    "configurations": [
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 2400
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 2620
      },
      {
        "key": "32-cm",
        "label": "32 cm",
        "priceCents": 2840
      },
      {
        "key": "34-cm",
        "label": "34 cm",
        "priceCents": 3060
      },
      {
        "key": "36-cm",
        "label": "36 cm",
        "priceCents": 3280
      },
      {
        "key": "38-cm",
        "label": "38 cm",
        "priceCents": 3500
      },
      {
        "key": "40-cm",
        "label": "40 cm",
        "priceCents": 3720
      },
      {
        "key": "42-cm",
        "label": "42 cm",
        "priceCents": 3940
      },
      {
        "key": "45-cm",
        "label": "45 cm",
        "priceCents": 4160
      },
      {
        "key": "48-cm",
        "label": "48 cm",
        "priceCents": 4380
      }
    ]
  },
  {
    "key": "floor-lamp",
    "reviewNotes": ["It lights my reading corner without taking table space.", "The shade keeps the bulb out of my direct view.", "The base is awkward in a narrow walkway."],
    "category": "lighting",
    "title": "Floor Reading Lamp",
    "attribute": "height",
    "description": "A freestanding lamp for a reading corner. Route its cable along the wall and keep the base clear of walkways.",
    "configurations": [
      {
        "key": "110-cm",
        "label": "110 cm",
        "priceCents": 5500
      },
      {
        "key": "115-cm",
        "label": "115 cm",
        "priceCents": 6100
      },
      {
        "key": "120-cm",
        "label": "120 cm",
        "priceCents": 6700
      },
      {
        "key": "125-cm",
        "label": "125 cm",
        "priceCents": 7300
      },
      {
        "key": "130-cm",
        "label": "130 cm",
        "priceCents": 7900
      },
      {
        "key": "135-cm",
        "label": "135 cm",
        "priceCents": 8500
      },
      {
        "key": "140-cm",
        "label": "140 cm",
        "priceCents": 9100
      },
      {
        "key": "145-cm",
        "label": "145 cm",
        "priceCents": 9700
      },
      {
        "key": "150-cm",
        "label": "150 cm",
        "priceCents": 10300
      },
      {
        "key": "160-cm",
        "label": "160 cm",
        "priceCents": 10900
      }
    ]
  },
  {
    "key": "pendant",
    "reviewNotes": ["It leaves the tabletop clear underneath.", "The layered shade directs light down towards the table.", "The fitting needed more planning than a plug-in lamp."],
    "category": "lighting",
    "title": "Pendant Light",
    "attribute": "diameter",
    "description": "A hanging light for an overhead fitting. Check the fitting and clearance with a qualified installer before use.",
    "configurations": [
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 3000
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 3400
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 3800
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 4200
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 4600
      },
      {
        "key": "26-cm",
        "label": "26 cm",
        "priceCents": 5000
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 5400
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 5800
      },
      {
        "key": "35-cm",
        "label": "35 cm",
        "priceCents": 6200
      },
      {
        "key": "40-cm",
        "label": "40 cm",
        "priceCents": 6600
      }
    ]
  },
  {
    "key": "table-lamp",
    "reviewNotes": ["The head directs light towards my book.", "The switch is easy to reach on a clear bedside surface.", "It leaves little room on my narrow bedside table."],
    "category": "lighting",
    "title": "Bedside Table Lamp",
    "attribute": "height",
    "description": "A table lamp for a bedside surface or low cabinet. Leave enough space around it to reach the switch comfortably.",
    "configurations": [
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 2300
      },
      {
        "key": "25-cm",
        "label": "25 cm",
        "priceCents": 2600
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 2900
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 3200
      },
      {
        "key": "32-cm",
        "label": "32 cm",
        "priceCents": 3500
      },
      {
        "key": "35-cm",
        "label": "35 cm",
        "priceCents": 3800
      },
      {
        "key": "38-cm",
        "label": "38 cm",
        "priceCents": 4100
      },
      {
        "key": "40-cm",
        "label": "40 cm",
        "priceCents": 4400
      },
      {
        "key": "42-cm",
        "label": "42 cm",
        "priceCents": 4700
      },
      {
        "key": "45-cm",
        "label": "45 cm",
        "priceCents": 5000
      }
    ]
  },
  {
    "key": "wall-lamp",
    "reviewNotes": ["It frees up space on the surface below.", "The bracket keeps the light in a fixed position.", "The mounting position cannot be changed casually."],
    "category": "lighting",
    "title": "Wall Sconce",
    "attribute": "width",
    "description": "A wall-mounted light keeps the nearby surface free. Check mounting and electrical requirements before installation.",
    "configurations": [
      {
        "key": "12-cm",
        "label": "12 cm",
        "priceCents": 2200
      },
      {
        "key": "14-cm",
        "label": "14 cm",
        "priceCents": 2450
      },
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 2700
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 2950
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 3200
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 3450
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 3700
      },
      {
        "key": "26-cm",
        "label": "26 cm",
        "priceCents": 3950
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 4200
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 4450
      }
    ]
  },
  {
    "key": "lantern",
    "reviewNotes": ["The enclosure keeps the candle in one place.", "The light through the sides is useful on the table.", "The top gets warm and needs time to cool."],
    "category": "lighting",
    "title": "Glass Candle Lamp",
    "attribute": "height",
    "description": "A lantern enclosure for a single candle. Use on a level, heat-resistant surface and never leave a flame unattended.",
    "configurations": [
      {
        "key": "15-cm",
        "label": "15 cm",
        "priceCents": 1800
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 2020
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 2240
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 2460
      },
      {
        "key": "25-cm",
        "label": "25 cm",
        "priceCents": 2680
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 2900
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 3120
      },
      {
        "key": "32-cm",
        "label": "32 cm",
        "priceCents": 3340
      },
      {
        "key": "35-cm",
        "label": "35 cm",
        "priceCents": 3560
      },
      {
        "key": "40-cm",
        "label": "40 cm",
        "priceCents": 3780
      }
    ]
  },
  {
    "key": "torch",
    "reviewNotes": ["It is easy to keep close to hand in a drawer.", "The beam helps when looking at the back of a cupboard.", "I have to remember to check the power source."],
    "category": "lighting",
    "title": "Handheld Torch",
    "attribute": "length",
    "description": "A handheld light for checking cupboards or finding your way indoors. Store where it is easy to reach during a power cut.",
    "configurations": [
      {
        "key": "9-cm",
        "label": "9 cm",
        "priceCents": 1800
      },
      {
        "key": "10-cm",
        "label": "10 cm",
        "priceCents": 1950
      },
      {
        "key": "11-cm",
        "label": "11 cm",
        "priceCents": 2100
      },
      {
        "key": "12-cm",
        "label": "12 cm",
        "priceCents": 2250
      },
      {
        "key": "13-cm",
        "label": "13 cm",
        "priceCents": 2400
      },
      {
        "key": "14-cm",
        "label": "14 cm",
        "priceCents": 2550
      },
      {
        "key": "15-cm",
        "label": "15 cm",
        "priceCents": 2700
      },
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 2850
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 3000
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 3150
      }
    ]
  },
  {
    "key": "lampshade",
    "reviewNotes": ["The shade keeps the bare bulb out of view.", "The fabric softens the light beside my chair.", "Matching the fitting took more care than choosing the diameter."],
    "category": "lighting",
    "title": "Fabric Lampshade",
    "attribute": "diameter",
    "description": "A shade for a compatible lamp fitting. Measure the existing fitting and allow clearance around the bulb before choosing a size.",
    "configurations": [
      {
        "key": "15-cm",
        "label": "15 cm",
        "priceCents": 1800
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 2000
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 2200
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 2400
      },
      {
        "key": "25-cm",
        "label": "25 cm",
        "priceCents": 2600
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 2800
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 3000
      },
      {
        "key": "32-cm",
        "label": "32 cm",
        "priceCents": 3200
      },
      {
        "key": "35-cm",
        "label": "35 cm",
        "priceCents": 3400
      },
      {
        "key": "40-cm",
        "label": "40 cm",
        "priceCents": 3600
      }
    ]
  },
  {
    "key": "tote",
    "reviewNotes": ["The open top makes it easy to reach what I need.", "The handles are convenient for short trips.", "Small loose objects tend to collect at the bottom."],
    "category": "bags",
    "title": "Everyday Tote Bag",
    "attribute": "capacity",
    "description": "An open carry bag for errands and everyday items. Put small loose objects in a pouch to make them easier to find.",
    "configurations": [
      {
        "key": "5-l",
        "label": "5 L",
        "priceCents": 1200
      },
      {
        "key": "6-l",
        "label": "6 L",
        "priceCents": 1350
      },
      {
        "key": "8-l",
        "label": "8 L",
        "priceCents": 1500
      },
      {
        "key": "10-l",
        "label": "10 L",
        "priceCents": 1650
      },
      {
        "key": "12-l",
        "label": "12 L",
        "priceCents": 1800
      },
      {
        "key": "14-l",
        "label": "14 L",
        "priceCents": 1950
      },
      {
        "key": "16-l",
        "label": "16 L",
        "priceCents": 2100
      },
      {
        "key": "18-l",
        "label": "18 L",
        "priceCents": 2250
      },
      {
        "key": "20-l",
        "label": "20 L",
        "priceCents": 2400
      },
      {
        "key": "24-l",
        "label": "24 L",
        "priceCents": 2550
      }
    ]
  },
  {
    "key": "backpack",
    "reviewNotes": ["Two straps are useful when my hands are full.", "The separate pockets help organize small items.", "Overfilling it makes the load less comfortable."],
    "category": "bags",
    "title": "Day Backpack",
    "attribute": "capacity",
    "description": "A two-strap bag with external pockets for everyday travel. Select a capacity for your usual load; accessories shown are not included.",
    "configurations": [
      {
        "key": "8-l",
        "label": "8 L",
        "priceCents": 2000
      },
      {
        "key": "10-l",
        "label": "10 L",
        "priceCents": 2300
      },
      {
        "key": "12-l",
        "label": "12 L",
        "priceCents": 2600
      },
      {
        "key": "14-l",
        "label": "14 L",
        "priceCents": 2900
      },
      {
        "key": "16-l",
        "label": "16 L",
        "priceCents": 3200
      },
      {
        "key": "18-l",
        "label": "18 L",
        "priceCents": 3500
      },
      {
        "key": "20-l",
        "label": "20 L",
        "priceCents": 3800
      },
      {
        "key": "22-l",
        "label": "22 L",
        "priceCents": 4100
      },
      {
        "key": "25-l",
        "label": "25 L",
        "priceCents": 4400
      },
      {
        "key": "28-l",
        "label": "28 L",
        "priceCents": 4700
      }
    ]
  },
  {
    "key": "messenger",
    "reviewNotes": ["I can reach the main compartment without setting it down.", "The flap covers the opening when I am carrying it.", "A heavy load pulls on one shoulder."],
    "category": "bags",
    "title": "Messenger Bag",
    "attribute": "capacity",
    "description": "A shoulder-carried bag that keeps the main compartment close to hand. Check dimensions separately before carrying a laptop.",
    "configurations": [
      {
        "key": "4-l",
        "label": "4 L",
        "priceCents": 2200
      },
      {
        "key": "5-l",
        "label": "5 L",
        "priceCents": 2500
      },
      {
        "key": "6-l",
        "label": "6 L",
        "priceCents": 2800
      },
      {
        "key": "7-l",
        "label": "7 L",
        "priceCents": 3100
      },
      {
        "key": "8-l",
        "label": "8 L",
        "priceCents": 3400
      },
      {
        "key": "10-l",
        "label": "10 L",
        "priceCents": 3700
      },
      {
        "key": "12-l",
        "label": "12 L",
        "priceCents": 4000
      },
      {
        "key": "14-l",
        "label": "14 L",
        "priceCents": 4300
      },
      {
        "key": "16-l",
        "label": "16 L",
        "priceCents": 4600
      },
      {
        "key": "18-l",
        "label": "18 L",
        "priceCents": 4900
      }
    ]
  },
  {
    "key": "duffel",
    "reviewNotes": ["The soft sides make it easy to pack spare clothing.", "The handles are useful for carrying it to the car.", "Small items get lost unless I use separate pouches."],
    "category": "bags",
    "title": "Travel Duffel Bag",
    "attribute": "capacity",
    "description": "A soft-sided bag for spare clothing and travel essentials. Packing smaller items in pouches helps keep the main space organized.",
    "configurations": [
      {
        "key": "15-l",
        "label": "15 L",
        "priceCents": 2400
      },
      {
        "key": "18-l",
        "label": "18 L",
        "priceCents": 2750
      },
      {
        "key": "20-l",
        "label": "20 L",
        "priceCents": 3100
      },
      {
        "key": "24-l",
        "label": "24 L",
        "priceCents": 3450
      },
      {
        "key": "28-l",
        "label": "28 L",
        "priceCents": 3800
      },
      {
        "key": "32-l",
        "label": "32 L",
        "priceCents": 4150
      },
      {
        "key": "36-l",
        "label": "36 L",
        "priceCents": 4500
      },
      {
        "key": "40-l",
        "label": "40 L",
        "priceCents": 4850
      },
      {
        "key": "45-l",
        "label": "45 L",
        "priceCents": 5200
      },
      {
        "key": "50-l",
        "label": "50 L",
        "priceCents": 5550
      }
    ]
  },
  {
    "key": "drawstring",
    "reviewNotes": ["The cords close the opening with a quick pull.", "It takes little space when empty.", "The cords are uncomfortable with a heavy load."],
    "category": "bags",
    "title": "Drawstring Carry Bag",
    "attribute": "capacity",
    "description": "A light bag with a drawstring closure for a few everyday items. Keep the load modest for comfortable carrying.",
    "configurations": [
      {
        "key": "3-l",
        "label": "3 L",
        "priceCents": 1200
      },
      {
        "key": "4-l",
        "label": "4 L",
        "priceCents": 1280
      },
      {
        "key": "5-l",
        "label": "5 L",
        "priceCents": 1360
      },
      {
        "key": "6-l",
        "label": "6 L",
        "priceCents": 1440
      },
      {
        "key": "7-l",
        "label": "7 L",
        "priceCents": 1520
      },
      {
        "key": "8-l",
        "label": "8 L",
        "priceCents": 1600
      },
      {
        "key": "10-l",
        "label": "10 L",
        "priceCents": 1680
      },
      {
        "key": "12-l",
        "label": "12 L",
        "priceCents": 1760
      },
      {
        "key": "14-l",
        "label": "14 L",
        "priceCents": 1840
      },
      {
        "key": "16-l",
        "label": "16 L",
        "priceCents": 1920
      }
    ]
  },
  {
    "key": "shopping",
    "reviewNotes": ["It is handy to keep ready for a short shopping trip.", "The open top makes packing groceries straightforward.", "Sharp corners on packaging can catch the sides."],
    "category": "bags",
    "title": "Reusable Shopping Bag",
    "attribute": "capacity",
    "description": "A reusable bag for carrying purchases home. Fold it between trips and keep heavier items low in the bag.",
    "configurations": [
      {
        "key": "6-l",
        "label": "6 L",
        "priceCents": 1200
      },
      {
        "key": "8-l",
        "label": "8 L",
        "priceCents": 1290
      },
      {
        "key": "10-l",
        "label": "10 L",
        "priceCents": 1380
      },
      {
        "key": "12-l",
        "label": "12 L",
        "priceCents": 1470
      },
      {
        "key": "14-l",
        "label": "14 L",
        "priceCents": 1560
      },
      {
        "key": "16-l",
        "label": "16 L",
        "priceCents": 1650
      },
      {
        "key": "18-l",
        "label": "18 L",
        "priceCents": 1740
      },
      {
        "key": "20-l",
        "label": "20 L",
        "priceCents": 1830
      },
      {
        "key": "24-l",
        "label": "24 L",
        "priceCents": 1920
      },
      {
        "key": "28-l",
        "label": "28 L",
        "priceCents": 2010
      }
    ]
  },
  {
    "key": "shoulder",
    "reviewNotes": ["My keys and phone stay close to hand.", "The flap covers the contents while I carry it.", "It has limited room once I add a bulky wallet."],
    "category": "bags",
    "title": "Compact Shoulder Bag",
    "attribute": "capacity",
    "description": "A small shoulder bag for a phone, keys and other essentials. Choose a capacity that leaves room to reach items easily.",
    "configurations": [
      {
        "key": "1-l",
        "label": "1 L",
        "priceCents": 1800
      },
      {
        "key": "1-5-l",
        "label": "1.5 L",
        "priceCents": 1970
      },
      {
        "key": "2-l",
        "label": "2 L",
        "priceCents": 2140
      },
      {
        "key": "2-5-l",
        "label": "2.5 L",
        "priceCents": 2310
      },
      {
        "key": "3-l",
        "label": "3 L",
        "priceCents": 2480
      },
      {
        "key": "3-5-l",
        "label": "3.5 L",
        "priceCents": 2650
      },
      {
        "key": "4-l",
        "label": "4 L",
        "priceCents": 2820
      },
      {
        "key": "4-5-l",
        "label": "4.5 L",
        "priceCents": 2990
      },
      {
        "key": "5-l",
        "label": "5 L",
        "priceCents": 3160
      },
      {
        "key": "6-l",
        "label": "6 L",
        "priceCents": 3330
      }
    ]
  },
  {
    "key": "wash-bag",
    "reviewNotes": ["It keeps toiletries separate from my clothing.", "I can find small bottles through the clear sides.", "Leaking containers still need their own sealed pouch."],
    "category": "bags",
    "title": "Travel Wash Bag",
    "attribute": "capacity",
    "description": "A separate bag keeps toiletries together inside luggage. Close bottles securely and use a separate pouch for anything that might leak.",
    "configurations": [
      {
        "key": "0-5-l",
        "label": "0.5 L",
        "priceCents": 1200
      },
      {
        "key": "0-7-l",
        "label": "0.7 L",
        "priceCents": 1300
      },
      {
        "key": "1-l",
        "label": "1 L",
        "priceCents": 1400
      },
      {
        "key": "1-2-l",
        "label": "1.2 L",
        "priceCents": 1500
      },
      {
        "key": "1-5-l",
        "label": "1.5 L",
        "priceCents": 1600
      },
      {
        "key": "1-8-l",
        "label": "1.8 L",
        "priceCents": 1700
      },
      {
        "key": "2-l",
        "label": "2 L",
        "priceCents": 1800
      },
      {
        "key": "2-5-l",
        "label": "2.5 L",
        "priceCents": 1900
      },
      {
        "key": "3-l",
        "label": "3 L",
        "priceCents": 2000
      },
      {
        "key": "3-5-l",
        "label": "3.5 L",
        "priceCents": 2100
      }
    ]
  },
  {
    "key": "watering-can",
    "reviewNotes": ["The handle helps control a small pour around a plant.", "The spout reaches pots that sit further back.", "It becomes heavy quickly as I add water."],
    "category": "outdoor",
    "title": "Garden Watering Can",
    "attribute": "capacity",
    "description": "A handled can for watering individual pots and beds. Fill only as much as you can carry comfortably.",
    "configurations": [
      {
        "key": "0-5-l",
        "label": "0.5 L",
        "priceCents": 700
      },
      {
        "key": "1-l",
        "label": "1 L",
        "priceCents": 870
      },
      {
        "key": "1-5-l",
        "label": "1.5 L",
        "priceCents": 1040
      },
      {
        "key": "2-l",
        "label": "2 L",
        "priceCents": 1210
      },
      {
        "key": "3-l",
        "label": "3 L",
        "priceCents": 1380
      },
      {
        "key": "4-l",
        "label": "4 L",
        "priceCents": 1550
      },
      {
        "key": "5-l",
        "label": "5 L",
        "priceCents": 1720
      },
      {
        "key": "6-l",
        "label": "6 L",
        "priceCents": 1890
      },
      {
        "key": "8-l",
        "label": "8 L",
        "priceCents": 2060
      },
      {
        "key": "10-l",
        "label": "10 L",
        "priceCents": 2230
      }
    ]
  },
  {
    "key": "trowel",
    "reviewNotes": ["The narrow blade fits between plants in a pot.", "It is easy to brush soil off before storing.", "Compacted soil is hard work with this small tool."],
    "category": "outdoor",
    "title": "Garden Hand Trowel",
    "attribute": "length",
    "description": "A small digging tool for potting and planting. Brush soil from the blade and dry it before storing.",
    "configurations": [
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 600
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 680
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 760
      },
      {
        "key": "26-cm",
        "label": "26 cm",
        "priceCents": 840
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 920
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 1000
      },
      {
        "key": "32-cm",
        "label": "32 cm",
        "priceCents": 1080
      },
      {
        "key": "34-cm",
        "label": "34 cm",
        "priceCents": 1160
      },
      {
        "key": "36-cm",
        "label": "36 cm",
        "priceCents": 1240
      },
      {
        "key": "38-cm",
        "label": "38 cm",
        "priceCents": 1320
      }
    ]
  },
  {
    "key": "rake",
    "reviewNotes": ["The head gathers loose garden material between plants.", "The long handle saves bending as much.", "It is awkward in a tightly planted bed."],
    "category": "outdoor",
    "title": "Garden Rake",
    "attribute": "width",
    "description": "A rake for gathering loose garden material and tidying beds. Select a head width that fits between your plants.",
    "configurations": [
      {
        "key": "15-cm",
        "label": "15 cm",
        "priceCents": 1000
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 1150
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 1300
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 1450
      },
      {
        "key": "25-cm",
        "label": "25 cm",
        "priceCents": 1600
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 1750
      },
      {
        "key": "30-cm",
        "label": "30 cm",
        "priceCents": 1900
      },
      {
        "key": "35-cm",
        "label": "35 cm",
        "priceCents": 2050
      },
      {
        "key": "40-cm",
        "label": "40 cm",
        "priceCents": 2200
      },
      {
        "key": "45-cm",
        "label": "45 cm",
        "priceCents": 2350
      }
    ]
  },
  {
    "key": "shovel",
    "reviewNotes": ["The blade moves loose soil without much spilling.", "The long handle gives me room to work beside a bed.", "Wet soil makes a full load heavy."],
    "category": "outdoor",
    "title": "Garden Shovel",
    "attribute": "length",
    "description": "A long-handled shovel for moving loose soil. Work in manageable loads and clean the blade after use.",
    "configurations": [
      {
        "key": "60-cm",
        "label": "60 cm",
        "priceCents": 1400
      },
      {
        "key": "65-cm",
        "label": "65 cm",
        "priceCents": 1570
      },
      {
        "key": "70-cm",
        "label": "70 cm",
        "priceCents": 1740
      },
      {
        "key": "75-cm",
        "label": "75 cm",
        "priceCents": 1910
      },
      {
        "key": "80-cm",
        "label": "80 cm",
        "priceCents": 2080
      },
      {
        "key": "85-cm",
        "label": "85 cm",
        "priceCents": 2250
      },
      {
        "key": "90-cm",
        "label": "90 cm",
        "priceCents": 2420
      },
      {
        "key": "95-cm",
        "label": "95 cm",
        "priceCents": 2590
      },
      {
        "key": "100-cm",
        "label": "100 cm",
        "priceCents": 2760
      },
      {
        "key": "110-cm",
        "label": "110 cm",
        "priceCents": 2930
      }
    ]
  },
  {
    "key": "pruner",
    "reviewNotes": ["The curved blades reach small stems easily.", "They are useful for light trimming around pots.", "Thick woody stems need a larger tool."],
    "category": "outdoor",
    "title": "Hand Pruning Shears",
    "attribute": "length",
    "description": "Hand shears for routine plant trimming. Clean the cutting surfaces between plants and close them before storage.",
    "configurations": [
      {
        "key": "15-cm",
        "label": "15 cm",
        "priceCents": 1000
      },
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 1110
      },
      {
        "key": "17-cm",
        "label": "17 cm",
        "priceCents": 1220
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 1330
      },
      {
        "key": "19-cm",
        "label": "19 cm",
        "priceCents": 1440
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 1550
      },
      {
        "key": "21-cm",
        "label": "21 cm",
        "priceCents": 1660
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 1770
      },
      {
        "key": "23-cm",
        "label": "23 cm",
        "priceCents": 1880
      },
      {
        "key": "24-cm",
        "label": "24 cm",
        "priceCents": 1990
      }
    ]
  },
  {
    "key": "fork",
    "reviewNotes": ["The tines break up small clumps in the bed.", "The long handle helps me work without crouching.", "The handle needs more shed space than a hand tool."],
    "category": "outdoor",
    "title": "Garden Digging Fork",
    "attribute": "length",
    "description": "Long tines loosen soil and lift small clumps from a bed. Work carefully near roots and remove trapped soil before storage.",
    "configurations": [
      {
        "key": "60-cm",
        "label": "60 cm",
        "priceCents": 1400
      },
      {
        "key": "65-cm",
        "label": "65 cm",
        "priceCents": 1550
      },
      {
        "key": "70-cm",
        "label": "70 cm",
        "priceCents": 1700
      },
      {
        "key": "75-cm",
        "label": "75 cm",
        "priceCents": 1850
      },
      {
        "key": "80-cm",
        "label": "80 cm",
        "priceCents": 2000
      },
      {
        "key": "85-cm",
        "label": "85 cm",
        "priceCents": 2150
      },
      {
        "key": "90-cm",
        "label": "90 cm",
        "priceCents": 2300
      },
      {
        "key": "95-cm",
        "label": "95 cm",
        "priceCents": 2450
      },
      {
        "key": "100-cm",
        "label": "100 cm",
        "priceCents": 2600
      },
      {
        "key": "110-cm",
        "label": "110 cm",
        "priceCents": 2750
      }
    ]
  },
  {
    "key": "saucer",
    "reviewNotes": ["It catches the drips when I water a pot indoors.", "The shallow edge makes standing water easy to see.", "I needed to measure the pot base more carefully."],
    "category": "outdoor",
    "title": "Plant Pot Saucer",
    "attribute": "diameter",
    "description": "A shallow saucer catches drainage under a plant pot. Empty standing water instead of leaving the pot submerged.",
    "configurations": [
      {
        "key": "8-cm",
        "label": "8 cm",
        "priceCents": 300
      },
      {
        "key": "10-cm",
        "label": "10 cm",
        "priceCents": 350
      },
      {
        "key": "12-cm",
        "label": "12 cm",
        "priceCents": 400
      },
      {
        "key": "14-cm",
        "label": "14 cm",
        "priceCents": 450
      },
      {
        "key": "16-cm",
        "label": "16 cm",
        "priceCents": 500
      },
      {
        "key": "18-cm",
        "label": "18 cm",
        "priceCents": 550
      },
      {
        "key": "20-cm",
        "label": "20 cm",
        "priceCents": 600
      },
      {
        "key": "22-cm",
        "label": "22 cm",
        "priceCents": 650
      },
      {
        "key": "25-cm",
        "label": "25 cm",
        "priceCents": 700
      },
      {
        "key": "28-cm",
        "label": "28 cm",
        "priceCents": 750
      }
    ]
  },
  {
    "key": "gloves",
    "reviewNotes": ["They keep loose soil off my hands when potting.", "The cuff covers the wrist during light garden work.", "I would not use these for sharp thorns."],
    "category": "outdoor",
    "title": "Gardening Gloves",
    "attribute": "size",
    "description": "Gloves for light garden handling, shown in representative styles. Sold as a pair; choose a hand size before choosing a cuff length.",
    "configurations": [
      {
        "key": "xs",
        "label": "XS",
        "priceCents": 600
      },
      {
        "key": "s",
        "label": "S",
        "priceCents": 680
      },
      {
        "key": "m",
        "label": "M",
        "priceCents": 760
      },
      {
        "key": "l",
        "label": "L",
        "priceCents": 840
      },
      {
        "key": "xl",
        "label": "XL",
        "priceCents": 920
      },
      {
        "key": "xs-long-cuff",
        "label": "XS long cuff",
        "priceCents": 1000
      },
      {
        "key": "s-long-cuff",
        "label": "S long cuff",
        "priceCents": 1080
      },
      {
        "key": "m-long-cuff",
        "label": "M long cuff",
        "priceCents": 1160
      },
      {
        "key": "l-long-cuff",
        "label": "L long cuff",
        "priceCents": 1240
      },
      {
        "key": "xl-long-cuff",
        "label": "XL long cuff",
        "priceCents": 1320
      }
    ]
  }
] as const satisfies readonly FamilyDefinition[];

/** Fictional names for synthetic review attribution; no customer identities. */
export const REVIEW_AUTHORS = [
  "Maya R.", "Samir H.", "Nora K.", "Leo M.", "Amina S.", "Daniel P.",
  "Tara B.", "Owen C.", "Leila A.", "Rafi N.", "Clara W.", "Jonah D.",
  "Mina L.", "Elias F.", "Sara J.", "Noah T.", "Iris G.", "Arun V.",
] as const;

/** Synthetic review contexts, paired with practical family-specific observations. */
export const REVIEW_CONTEXTS = {
  "home": [
    "I use it in a small living room.",
    "It sits alongside things I already own.",
    "I checked the shelf space before choosing it.",
    "I keep it away from the busiest part of the room.",
    "It was easy to find a place for it beside the sofa.",
    "I would measure the available space again before buying another size.",
    "It is more practical in a clear space than among lots of other objects.",
    "I chose it for a spare room that is used occasionally.",
    "It has a regular place in our shared living area.",
    "I moved a few things around to make room for it.",
    "The size matters more than I first expected.",
    "I bought it for a room with very little spare storage."
  ],
  "kitchen": [
    "I use it when cooking for one.",
    "It has a place in my everyday kitchen cupboard.",
    "I wash it by hand after use.",
    "I chose the size to fit the space I have.",
    "It is useful for preparing a small meal.",
    "I would check the cupboard clearance before choosing a larger one.",
    "I keep it within reach of the worktop.",
    "It gets used at weekends more than on busy weekdays.",
    "I bought it for a kitchen with limited storage.",
    "It fits the way I prepare meals at home.",
    "I need to leave room for it on the drying rack.",
    "I have started putting it away separately from heavier kitchen items."
  ],
  "office": [
    "I keep it at my writing desk.",
    "It is useful when I am working with paper notes.",
    "I share the stationery drawer with someone else.",
    "I chose it for occasional work at home.",
    "It has a place with the supplies for my evening course.",
    "I take it out for planning sessions.",
    "I keep it separate from my children's craft supplies.",
    "It gets used more often than the other things in my desk drawer.",
    "I checked the size against the storage tray first.",
    "I use it for short sessions rather than all-day work.",
    "It is part of the small set I keep by the phone.",
    "I bought it to replace something missing from my desk."
  ],
  "lighting": [
    "I use it for evening reading.",
    "I checked the dimensions before deciding where it would go.",
    "It is in a room that gets little daylight.",
    "I keep the surrounding area clear.",
    "I chose it for a small corner of the room.",
    "I paid more attention to placement after using it.",
    "It is useful alongside the main room light.",
    "I use it for short periods in the evening.",
    "I looked at the available space before choosing a size.",
    "It is in a room used mostly at weekends.",
    "I would check the fitting or power requirements again before buying another.",
    "I chose it for one specific spot rather than the whole room."
  ],
  "bags": [
    "I use it for short trips near home.",
    "I pack only the things I expect to need.",
    "It is useful on days when I am travelling light.",
    "I keep smaller items together inside it.",
    "I chose the capacity for my usual routine.",
    "I would check the size of bulky items before buying it again.",
    "It stays near the door between trips.",
    "I use it occasionally rather than for a daily commute.",
    "I tried packing it at home before taking it out.",
    "It works best for me when it is not completely full.",
    "I keep a separate pouch for anything that might leak.",
    "I bought it for a specific trip and still use it afterwards."
  ],
  "outdoor": [
    "I use it for a small garden at home.",
    "I clean it before putting it back in the shed.",
    "It is useful for short sessions outside.",
    "I chose the size for the space around my plants.",
    "I keep it with the supplies for my pots.",
    "I would check the size more carefully before buying another.",
    "It gets used mostly at weekends.",
    "I dry it after working in wet conditions.",
    "I bought it for routine garden jobs.",
    "I keep it separate from heavier equipment.",
    "I use it in a small planted area beside the house.",
    "I put it away after use rather than leaving it outdoors."
  ]
} as const;
