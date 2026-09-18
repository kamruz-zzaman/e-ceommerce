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
  readonly reviewNotes: {
    readonly positive: readonly string[];
    readonly limitations: readonly string[];
  };
  readonly configurations: readonly Configuration[];
}

/** Explicitly allowed configurations: no arbitrary attribute cross-product. */
export const FAMILIES = [
  {
    "key": "woven-basket",
    "reviewNotes": {
      "positive": [
        "The {label} width fits beside the other baskets on my shelf.",
        "Small items stay visible across the {label} opening.",
        "The {label} width leaves room for folded cloths.",
        "I can see what is inside without opening anything.",
        "At {label} wide, it is easy to lift by the handle.",
        "It is useful for gathering things from several rooms.",
        "I chose {label} after measuring the shelf opening.",
        "The curved sides make it easier to lift than a square box."
      ],
      "limitations": [
        "The weave catches on loose threads.",
        "Tiny objects can slip into the weave.",
        "The handle adds height beyond the stated {label} width.",
        "It offers no cover against dust."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} height works with a few short stems.",
        "The pattern is visible along the {label} tall body.",
        "At {label} high, it fits below my wall shelf.",
        "The wide shoulder gives stems room to spread.",
        "I leave space around the vase even at {label} high.",
        "The patterned surface needs very little else around it.",
        "The {label} height works with the stems I usually cut.",
        "A damp cloth reaches most of the exterior."
      ],
      "limitations": [
        "The shoulder takes up more space than the opening suggests.",
        "The patterned surface makes water marks harder to notice.",
        "A {label} vase needs stems cut to suit its height.",
        "Long stems can make a short arrangement look unbalanced."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The surround works well with my {label} photograph.",
        "My {label} print fits without trimming the edges.",
        "My {label} print fits inside the opening.",
        "The grain is different along each edge.",
        "I leave a gap around the frame for a {label} print.",
        "It works with an uncropped photograph from my album.",
        "Choosing by the {label} print size was straightforward.",
        "The wooden border gives me something to hold while moving it."
      ],
      "limitations": [
        "The uneven outer edge makes a tightly spaced arrangement difficult.",
        "The outer dimensions matter as well as the print size.",
        "The outer frame is larger than the listed {label} print size.",
        "The irregular edge needs care when dusting."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} width gives my back a soft resting surface.",
        "A {label} cushion takes up a useful part of the bench.",
        "The {label} width fits across my chair.",
        "I use it behind my back for short reading sessions.",
        "I checked how much seat space a {label} cushion would leave.",
        "It is easy to move from the sofa to a chair.",
        "I checked the seat width before choosing {label}.",
        "The cushion gives a hard seat a softer surface."
      ],
      "limitations": [
        "It occupies more of the seat than I expected.",
        "The pattern is busier than my other cushions.",
        "The {label} width leaves less spare space on my chair.",
        "Small marks take more attention than on a wipe-clean seat."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} throw folds over the sofa arm.",
        "I use the {label} layer across my knees indoors.",
        "The {label} size covers my lap when folded.",
        "I can see the open texture of the fabric clearly.",
        "The {label} size folds flat enough for my shelf.",
        "I use it as an extra layer over a sheet.",
        "I chose {label} for the end of a small bed.",
        "The fabric folds into a fairly flat stack."
      ],
      "limitations": [
        "I wanted more warmth than this light layer provides.",
        "The open weave can catch on jewellery.",
        "A {label} throw still needs another layer on a cold evening.",
        "I need a second layer on colder evenings."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} mat gives me enough area to wipe my shoes.",
        "I can lift the {label} mat to shake out grit.",
        "The {label} footprint fits inside my covered entrance.",
        "The rope texture gets into the tread of my shoes.",
        "The {label} size leaves a clear edge beside the doorway.",
        "The rounded edges suit the space beside the door.",
        "I measured the doorway before choosing {label}.",
        "It is easy to see when grit needs shaking out."
      ],
      "limitations": [
        "Loose fibres need sweeping up around the mat.",
        "The raised weave needs clearance under the door.",
        "The {label} footprint needs checking against the door swing.",
        "Wet footwear leaves the fibres damp for a while."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "I can read the {label} dial from my desk.",
        "The numerals are clear around the {label} face.",
        "The {label} dial fits the space above my desk.",
        "The dark face contrasts clearly with the pale hands.",
        "A {label} clock fits between the shelves above my table.",
        "The numerals are spaced far enough apart for a quick glance.",
        "I chose {label} for a wall with little free space.",
        "The round outline works between two shelves."
      ],
      "limitations": [
        "I should have measured the free wall space first.",
        "Reflections sometimes make the face harder to read.",
        "The {label} face still needs a clear sightline across the room.",
        "It needs a clear sightline from where I sit."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} holder keeps one candle in a defined spot.",
        "At {label} high, it leaves space above the flame.",
        "The {label} height keeps it below the nearby shelf.",
        "The glass catches light even before a candle is lit.",
        "The {label} size is useful on a cleared table.",
        "The glass is easy to check for wax after the candle has cooled.",
        "I allowed extra clearance above the {label} holder.",
        "The small footprint leaves room around it."
      ],
      "limitations": [
        "I had to check my candle size before using it.",
        "Wax is fiddly to remove from the edges.",
        "The {label} measurement does not include the candle above it.",
        "It is less useful when my table is crowded."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} box gathers the small things from my shelf.",
        "I can move the contents together in the {label} box.",
        "The {label} capacity suits my collection of small supplies.",
        "I can take the whole box off the shelf in one go.",
        "The {label} capacity suits one group of supplies.",
        "I group similar items together before filling it.",
        "I chose {label} for things that used to spread across a drawer.",
        "The lid keeps the contents covered between uses."
      ],
      "limitations": [
        "Opening the lid needs more clearance than I allowed.",
        "The opaque sides mean I have to open it to check inside.",
        "The {label} capacity does not tell me whether a long object will fit.",
        "A filled box is less convenient to move than an open tray."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} rim gives me room around the plant.",
        "I use a separate saucer under the {label} pot.",
        "The {label} diameter fits the space on my windowsill.",
        "The broad rim is useful when lifting it with both hands.",
        "The {label} diameter fits beside my other pots.",
        "The plain surface is easy to check for cracks before repotting.",
        "I chose {label} after checking the size of the root ball.",
        "It is easy to see when the outside has become damp."
      ],
      "limitations": [
        "The soil dries out sooner than in my glazed pots.",
        "The clay can mark a shelf without protection.",
        "The {label} pot needs more care when full of wet soil.",
        "Watering needs attention in warm weather."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The handle on the {label} mug leaves room for my fingers.",
        "The {label} capacity suits my usual cup of tea.",
        "The {label} volume matches the drink I usually make.",
        "The plain interior makes it easy to see how full it is.",
        "I leave a gap below the rim of the {label} mug.",
        "The handle is useful when the drink is hot.",
        "I chose {label} to fit my usual tea serving.",
        "The rounded shape is easy to rinse."
      ],
      "limitations": [
        "Filling it near the rim makes it awkward to carry.",
        "It takes more shelf room than a handleless cup.",
        "A full {label} mug needs more care when carrying it upstairs.",
        "A full mug needs a steady hand on the stairs."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} bowl works for a side dish.",
        "The {label} opening is easy to wash by hand.",
        "The {label} diameter works for a portion of vegetables.",
        "The blue band is easy to distinguish in my cupboard.",
        "I can reach the inside of the {label} bowl with a sponge.",
        "I use it for serving rather than storing leftovers.",
        "I checked my shelf depth before choosing {label}.",
        "The rim gives me somewhere to hold it when passing food."
      ],
      "limitations": [
        "It takes more cupboard space than a straight-sided bowl.",
        "It needs a separate cover for leftovers.",
        "A {label} bowl needs its own space in my crowded cupboard.",
        "It can be awkward to fit beside larger bowls in the rack."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The pattern fits neatly around the {label} plate.",
        "The rim of the {label} plate gives me somewhere to hold it.",
        "The {label} diameter suits my usual table setting.",
        "The blue pattern is concentrated around the serving area.",
        "The {label} size works with my existing place settings.",
        "It is easy to carry with two hands at the rim.",
        "I chose {label} after checking the plate rack.",
        "The shallow shape takes less height than a bowl."
      ],
      "limitations": [
        "The patterned rim leaves less flat space for food.",
        "The pattern makes small crumbs less obvious.",
        "The rim leaves less serving space than the full {label} diameter.",
        "It leaves little spare space in a crowded place setting."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} board gives me space for a few vegetables.",
        "I stand the {label} board upright to dry both sides.",
        "The {label} surface gives me room to prepare a few vegetables.",
        "I keep a cloth underneath to steady it on the counter.",
        "The {label} surface is useful for one preparation task at a time.",
        "I use one side at a time and clean it straight afterwards.",
        "I measured my worktop before choosing {label}.",
        "The flat shape stores against the cupboard wall."
      ],
      "limitations": [
        "It needs more care after washing than my plastic board.",
        "It takes time to dry before storage.",
        "The {label} board takes room beside the sink while drying.",
        "It needs more cupboard width than a small serving board."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} pan pours a small portion without a wide opening.",
        "I use the {label} pan to heat sauce rather than a whole meal.",
        "The {label} capacity fits the small portions I usually heat.",
        "The open top makes it easy to watch a sauce.",
        "The {label} capacity leaves me room to stir a modest portion.",
        "The straight sides give me room to stir.",
        "I chose {label} for a smaller hob ring.",
        "It pours more predictably when I use both hands for support."
      ],
      "limitations": [
        "It feels heavy when filled close to the top.",
        "The handle takes extra room in the cupboard.",
        "Filling the {label} pan makes lifting it noticeably harder.",
        "It is easy to make too much if I fill it completely."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} pan leaves space to turn a small portion.",
        "The {label} surface suits the amount I usually cook.",
        "The {label} diameter leaves room for the portions I cook.",
        "The long handle helps when moving it off the heat.",
        "I leave gaps between pieces of food in the {label} pan.",
        "The shallow edge makes the cooking surface easy to reach.",
        "I checked the hob width before choosing {label}.",
        "It is easy to see whether the surface needs cleaning."
      ],
      "limitations": [
        "Food gets crowded if I try to cook too much at once.",
        "The open sides offer little protection from splashes.",
        "The {label} pan takes more cupboard width once the handle is included.",
        "It needs space beside the sink when drying."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The spout on the {label} kettle is easy to aim at a cup.",
        "I can lift the {label} kettle by its upright handle.",
        "The {label} capacity covers the amount of water I usually need.",
        "The short spout is easy to aim at a cup.",
        "I heat only what I need within the {label} capacity.",
        "The upright handle makes lifting straightforward.",
        "I chose {label} so I would not heat more water than needed.",
        "The wide body sits clearly on the hob."
      ],
      "limitations": [
        "A full kettle is heavier to pour than I expected.",
        "Pouring the last water takes more of a tilt.",
        "A full {label} kettle takes a steadier grip when pouring.",
        "It stays warm for a while after I empty it."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "Water drains out of the {label} colander over my sink.",
        "The handles make the {label} colander easy to lift.",
        "The {label} diameter fits over the space in my sink.",
        "The two handles give me a grip on either side.",
        "The {label} opening gives room to rinse vegetables.",
        "The holes are easy to check for trapped food.",
        "I chose {label} after measuring the sink opening.",
        "It is easy to tip the contents into a bowl."
      ],
      "limitations": [
        "Small grains fall through the holes.",
        "Water can drip from the base when carrying it.",
        "The {label} colander needs space underneath for water to drain.",
        "The holes are not fine enough for every ingredient."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "I can see how much is left in the {label} jar.",
        "The {label} capacity keeps one dry ingredient together.",
        "The {label} capacity holds a small batch of dry ingredients.",
        "The clear sides make it easy to spot what needs using.",
        "The {label} jar is useful for separating a small batch.",
        "The opening makes it easy to check the contents.",
        "I chose {label} to avoid several half-filled containers.",
        "It is useful for separating ingredients with similar colours."
      ],
      "limitations": [
        "The glass adds weight on a crowded shelf.",
        "The glass needs care around a hard sink.",
        "The {label} capacity includes space I leave empty below the rim.",
        "I still need a label for ingredients that look alike."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} spoon reaches the sauce in my usual pan.",
        "I rinse the {label} spoon before food dries onto it.",
        "The {label} length reaches into the pan I use most.",
        "The broad head moves sauce around the base.",
        "The {label} handle fits in my utensil pot.",
        "The handle gives me somewhere to rest my fingers.",
        "I chose {label} to keep my hand further from the pan.",
        "It hangs over the edge of my utensil pot."
      ],
      "limitations": [
        "Strongly coloured food has marked the wood.",
        "It takes longer to dry than a metal spoon.",
        "The {label} length can be awkward in a shallow drawer.",
        "It needs washing promptly after thick sauces."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} notebook keeps the notes for one project together.",
        "I have enough space across {label} for notes and corrections.",
        "With {label}, I have space for a single project.",
        "I can turn back through my notes without loose pages slipping out.",
        "I leave spare pages within the {label} for later additions.",
        "I leave a few pages free for changes to my notes.",
        "I chose {label} rather than carrying several thin notebooks.",
        "The ruled layout helps with short lists."
      ],
      "limitations": [
        "It takes up more bag space than loose sheets.",
        "The binding takes some space when writing near the middle.",
        "A notebook with {label} is less flexible than loose pages for reorganizing notes.",
        "The cover needs protection from spills in a bag."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The pack of {label} gives me spares for correcting notes.",
        "I keep some of the {label} near my sketchbook.",
        "The pack of {label} gives me a few spares for my desk.",
        "I use them for notes that may need changing.",
        "I divide the {label} between the places where I write.",
        "I keep the sharpened points away from loose papers.",
        "I split the pack of {label} between a drawer and my bag.",
        "The blue barrels are easy to spot among other stationery."
      ],
      "limitations": [
        "I need a sharpener nearby during longer sessions.",
        "The points can break if left loose in a bag.",
        "All {label} need a separate sharpener during regular use.",
        "Sharpening leaves waste that needs clearing away."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The pack of {label} lets me leave a pen near my notebook.",
        "I put the caps back on the {label} before packing them away.",
        "The pack of {label} lets me leave pens in several places.",
        "The clear barrel makes the ink visible.",
        "I keep the {label} with my everyday writing supplies.",
        "The slim shape fits beside my notebook.",
        "I divided the pack of {label} between home and work.",
        "It is straightforward for quick handwritten notes."
      ],
      "limitations": [
        "The pack has no spare ink refills.",
        "A loose cap is easy to misplace.",
        "The pack of {label} does not include ink refills.",
        "The cap needs checking before it goes into my bag."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The pack of {label} is useful for paper layouts.",
        "The pack of {label} is easy to keep beside my notebooks.",
        "The pack of {label} is useful for sharing desk supplies.",
        "The translucent edge lets me see the paper underneath.",
        "I keep the pack of {label} with my desk supplies.",
        "It lies flat beside my notebook.",
        "I keep the pack of {label} with my paper supplies.",
        "The straight edge is useful even when I am not measuring."
      ],
      "limitations": [
        "The length does not fit my usual pencil case.",
        "The pale markings can be hard to see on a dark surface.",
        "The pack of {label} still needs a drawer long enough for a 30 cm edge.",
        "The length gets in the way on a small desk."
      ]
    },
    "category": "office",
    "title": "30 cm Ruler Set",
    "attribute": "pack",
    "description": "Straight 30 cm rulers for paper layouts and desk work. Pack quantities suit individual desks or shared stationery supplies.",
    "configurations": [
      {
        "key": "1-rulers",
        "label": "1 ruler",
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
    "reviewNotes": {
      "positive": [
        "The {label} scissors reach small corners in paper.",
        "The {label} size works for short craft tasks.",
        "The {label} length fits the space in my desk tray.",
        "The metal loops give me a clear grip for small cuts.",
        "The {label} pair fits in the tray I use for stationery.",
        "The blades are easy to wipe after light craft work.",
        "I chose {label} for short desk tasks.",
        "They store neatly with the blades closed."
      ],
      "limitations": [
        "I would use a different pair for thick fabric.",
        "The finger openings feel less comfortable during long sessions.",
        "The {label} measurement includes the handles as well as the blades.",
        "The pointed ends need care when stored with loose stationery."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} capacity covers the documents I usually join.",
        "The stapler rated for {label} sits flat on my desk.",
        "The {label} capacity covers the short documents I assemble.",
        "The base stays in place while I press down.",
        "I chose the {label} capacity for short sets of notes.",
        "I keep spare staples in the same drawer.",
        "I chose {label} for ordinary office paper.",
        "The top gives me a clear place to press."
      ],
      "limitations": [
        "Thicker paper makes the stated sheet count harder to reach.",
        "A thick corner takes more pressure than a thin stack.",
        "Thick paper reduces the practical {label} capacity.",
        "It adds more bulk to a drawer than a box of clips."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} spine is easy to spot between my folders.",
        "The {label} width leaves room for my project papers.",
        "The {label} spine leaves space for the papers I file.",
        "The upright shape makes it easy to keep with other folders.",
        "I use the {label} binder for one subject at a time.",
        "I can take individual pages out when needed.",
        "I checked my shelf before choosing the {label} spine.",
        "It keeps papers from spreading across my desk."
      ],
      "limitations": [
        "Unpunched sheets need separate sleeves.",
        "A partly filled binder still takes its full shelf width.",
        "The {label} spine takes its full shelf width even when nearly empty.",
        "It is bulkier to carry than a thin document wallet."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} case keeps small stationery together.",
        "The {label} length fits my usual pens.",
        "The {label} length fits my regular pens.",
        "The zip opens far enough to see the contents.",
        "I can see the contents when the {label} zip case is open.",
        "The soft sides fit around a modest load.",
        "I checked my longest pencil before choosing {label}.",
        "I can lift the whole set out of my bag together."
      ],
      "limitations": [
        "A bulky sharpener leaves less room for long pencils.",
        "Small erasers still end up under the pens.",
        "A long pen needs checking against the {label} case length.",
        "It offers little protection from heavier items in the bag."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} height lets me put light above the page.",
        "I can position the arm of the {label} lamp beside my notebook.",
        "The {label} height puts the light above my notebook.",
        "The joints let me move the shade without shifting the base.",
        "The {label} size works below the shelf over my desk.",
        "The directed light is useful for checking small print.",
        "I chose {label} after measuring the space under my shelf.",
        "The base gives me a fixed point while adjusting the arm."
      ],
      "limitations": [
        "It needs clear space behind the base to adjust.",
        "The arm can get in the way of a tall monitor.",
        "The arm needs room around the stated {label} height when adjusted.",
        "It takes more planning to place than a small fixed lamp."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} lamp leaves my reading table free.",
        "The shade on the {label} lamp keeps the bulb out of direct view.",
        "The {label} height puts the shade beside my reading chair.",
        "The slim upright leaves room near the sofa.",
        "I place the {label} lamp beside a chair rather than in a walkway.",
        "The shade keeps the bare bulb out of view.",
        "I checked the ceiling clearance before choosing {label}.",
        "The base stays in one place beside the chair."
      ],
      "limitations": [
        "The base is awkward in a narrow walkway.",
        "The cable needs routing away from where people walk.",
        "The {label} height needs checking against nearby shelves.",
        "The shade collects dust between its folds."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} fitting leaves the table clear below it.",
        "The layers on the {label} shade direct light downwards.",
        "The {label} diameter fits over my small table.",
        "The separate shade layers keep the bulb less exposed.",
        "The {label} diameter fits over my table without reaching its edges.",
        "The circular shape works over a round table.",
        "I checked the table width before choosing {label}.",
        "Light reaches the area below the fitting."
      ],
      "limitations": [
        "The fitting needed more planning than a plug-in lamp.",
        "Dust collects along the edges of the shades.",
        "The {label} shade width does not account for the hanging clearance.",
        "It is not something I can move when rearranging the table."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} lamp puts light near my book.",
        "The switch on the {label} lamp is reachable from the bed.",
        "The {label} height works beside my bed.",
        "The curved neck puts the head above an open book.",
        "The {label} height leaves room below the shelf above it.",
        "I can position the head without moving the bedside table.",
        "I measured the shelf above the bed before choosing {label}.",
        "The dark finish is easy to distinguish against my pale wall."
      ],
      "limitations": [
        "It leaves little room on my narrow bedside table.",
        "The cable takes room behind the table.",
        "The {label} height does not show how much space the base needs.",
        "The round base does not fit tightly into a corner."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} sconce keeps the surface below it free.",
        "The {label} fitting stays clear of the nearby shelf.",
        "I left clearance around the {label} fitting beside the door.",
        "The bracket leaves the surface below free.",
        "The {label} width fits beside the doorway.",
        "It is useful where there is no room for a table lamp.",
        "I checked the wall space before choosing {label}.",
        "The open shape is easy to see against a plain wall."
      ],
      "limitations": [
        "The mounting position cannot be changed casually.",
        "The projecting bracket needs clearance near a doorway.",
        "The {label} width still needs clearance for the projecting bracket.",
        "The fixed position limits where the light reaches."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} enclosure keeps the candle in one place.",
        "The {label} glass lamp gives a small point of light on the table.",
        "The {label} height fits on my cleared dining table.",
        "The glass lets me see the candle as it burns down.",
        "The {label} size fits on a cleared, level surface.",
        "The raised base gives the candle a defined place.",
        "I left open space above the {label} enclosure.",
        "The flame is visible through the rounded glass."
      ],
      "limitations": [
        "The top gets warm and needs time to cool.",
        "The dim light is not enough for reading.",
        "The {label} enclosure needs clearance above the flame.",
        "The glass needs time to cool before I move it."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} torch fits the drawer near the fuse box.",
        "The beam from the {label} torch helps with a dark cupboard.",
        "The {label} length fits my utility drawer.",
        "The head is easy to point into a dark cupboard.",
        "I can hold the {label} body while pointing it under furniture.",
        "The narrow body is easy to grip for a quick check.",
        "I chose {label} to fit the storage space by the door.",
        "It is useful for looking underneath furniture."
      ],
      "limitations": [
        "I have to remember to check the power source.",
        "The beam covers only a small area at a time.",
        "The {label} length needs checking before choosing a storage pouch.",
        "It needs a separate place so it is easy to find in the dark."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} shade keeps the bare bulb out of view.",
        "The fabric on the {label} shade softens the light beside my chair.",
        "The {label} diameter fits around my existing lamp fitting.",
        "The fabric softens the view of the bulb.",
        "The {label} diameter suits my existing base.",
        "The plain shape works with the base I already own.",
        "I checked the fitting before choosing the {label} size.",
        "The rim is easy to hold when removing it for dusting."
      ],
      "limitations": [
        "Matching the fitting took more care than choosing the diameter.",
        "The fabric needs gentler cleaning than a hard shade.",
        "The {label} diameter does not establish whether the fitting will match.",
        "The shade leaves less room near a low shelf."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} tote is easy to reach into during errands.",
        "The handles on the {label} tote are convenient for a short trip.",
        "The {label} capacity is enough for my usual errands.",
        "The light handles are easy to find against the yellow sides.",
        "I keep the contents of the {label} tote in one place.",
        "I can reach inside without undoing a closure.",
        "I chose {label} for carrying a notebook and a few small items.",
        "One bag is convenient when I want to keep the load together."
      ],
      "limitations": [
        "Small loose objects tend to collect at the bottom.",
        "The opening leaves the contents exposed in rain.",
        "The {label} capacity does not mean a heavy load will be comfortable.",
        "Small items need their own pouch inside."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} backpack leaves my hands free.",
        "The pockets on the {label} bag separate small items.",
        "The {label} capacity suits my usual load for a day out.",
        "The external pockets keep small things away from the main space.",
        "I keep heavy items near the back of the {label} bag.",
        "The main opening lets me see what is packed near the top.",
        "I chose {label} for the amount I normally carry.",
        "The top handle helps when lifting it from the floor."
      ],
      "limitations": [
        "Overfilling it makes the load less comfortable.",
        "Loose straps need tidying before storage.",
        "Filling the whole {label} capacity makes the bag bulky.",
        "A full main compartment makes the bag bulky in a narrow space."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} bag lets me reach the main space while wearing it.",
        "The flap covers the opening on the {label} messenger bag.",
        "The {label} capacity fits the things I carry to work.",
        "The front flap covers the main opening.",
        "The {label} size works for papers and small items.",
        "I can bring the bag in front of me to reach inside.",
        "I chose {label} for papers and a few small items.",
        "The flap gives me a clear way to close it between stops."
      ],
      "limitations": [
        "A heavy load pulls on one shoulder.",
        "It swings against my side if the strap is left too long.",
        "A full {label} load puts its weight on one shoulder.",
        "The single strap needs adjusting for a comfortable position."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} duffel leaves room for spare clothing.",
        "The handles make the {label} bag easy to lift together.",
        "The {label} capacity suits a short trip with spare clothing.",
        "The two handles are easy to gather in one hand.",
        "The {label} capacity suits the clothing I pack for a short trip.",
        "The soft shape fits around the things I pack.",
        "I chose {label} for a weekend change of clothes.",
        "It is easy to see the main contents when set down and opened."
      ],
      "limitations": [
        "Small items get lost unless I use separate pouches.",
        "The main compartment does not keep small items separate.",
        "The {label} main compartment still needs pouches for small things.",
        "The flexible body gives little support to fragile items."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The cords close the {label} bag with a short pull.",
        "The {label} bag takes little space when empty.",
        "The {label} capacity works for a light change of clothes.",
        "The cords gather the top without a separate fastener.",
        "I keep a modest load in the {label} drawstring bag.",
        "The soft sides take little room inside another bag.",
        "I chose {label} for a modest load on a short trip.",
        "The pale cords are easy to see against the navy fabric."
      ],
      "limitations": [
        "The cords are uncomfortable with a heavy load.",
        "The opening needs pulling closed after every use.",
        "Filling the {label} capacity with heavy items strains the thin cords.",
        "The cords can tangle with other items in storage."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "With {label}, the pair lets me separate groceries from other purchases.",
        "The open tops make the pair easy to pack, with {label} of space.",
        "The {label} capacity lets me split a grocery trip in two.",
        "Having two bags keeps fragile groceries away from heavier items.",
        "I carry one bag in each hand, sharing the load at {label}.",
        "The open tops make it easy to sort purchases while packing.",
        "I chose the {label} pair for a regular grocery trip.",
        "I can leave one of the pair folded inside the other."
      ],
      "limitations": [
        "I have to find space for two bags between shopping trips.",
        "Two bags take more space to put away than one.",
        "Even with {label}, the pair needs care when packing heavy items.",
        "I still need a separate container for anything that could leak."
      ]
    },
    "category": "bags",
    "title": "Shopping Tote Pair",
    "attribute": "capacity",
    "description": "Two open-top bags for separating groceries into manageable loads. Each has the handles and broad base shown; the photograph shows one bag. The price covers the pair.",
    "configurations": [
      {
        "key": "6-l",
        "label": "6 L per bag",
        "priceCents": 2400
      },
      {
        "key": "8-l",
        "label": "8 L per bag",
        "priceCents": 2580
      },
      {
        "key": "10-l",
        "label": "10 L per bag",
        "priceCents": 2760
      },
      {
        "key": "12-l",
        "label": "12 L per bag",
        "priceCents": 2940
      },
      {
        "key": "14-l",
        "label": "14 L per bag",
        "priceCents": 3120
      },
      {
        "key": "16-l",
        "label": "16 L per bag",
        "priceCents": 3300
      },
      {
        "key": "18-l",
        "label": "18 L per bag",
        "priceCents": 3480
      },
      {
        "key": "20-l",
        "label": "20 L per bag",
        "priceCents": 3660
      },
      {
        "key": "24-l",
        "label": "24 L per bag",
        "priceCents": 3840
      },
      {
        "key": "28-l",
        "label": "28 L per bag",
        "priceCents": 4020
      }
    ]
  },
  {
    "key": "shoulder",
    "reviewNotes": {
      "positive": [
        "The {label} bag keeps my phone and keys close to hand.",
        "The flap covers the contents of the {label} bag.",
        "The {label} capacity fits the essentials I usually carry.",
        "The front flap gives me access without opening several pockets.",
        "I can bring the {label} bag in front of me to find things.",
        "I bring it in front of me when looking for my keys.",
        "I chose {label} for a phone and a small wallet.",
        "The narrow shape stays close to my side."
      ],
      "limitations": [
        "It has limited room once I add a bulky wallet.",
        "The flap needs lifting to reach the contents.",
        "The {label} capacity fills quickly with a bulky wallet.",
        "It is easy to fill the space before adding anything extra."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} wash bag keeps toiletries away from clothing.",
        "I can see small bottles through the {label} bag.",
        "The {label} capacity holds the toiletries I take on short trips.",
        "The clear sides make small bottles easier to spot.",
        "The {label} capacity suits my travel containers.",
        "The opening gives me access without emptying everything.",
        "I chose {label} for smaller travel containers.",
        "I can lift the whole group out when unpacking."
      ],
      "limitations": [
        "Leaking containers still need their own sealed pouch.",
        "It does not stop an unsealed bottle leaking.",
        "The {label} capacity leaves less room if I use full-size bottles.",
        "Large containers leave little room for small accessories."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The handle helps control a small pour from the {label} can.",
        "The spout on the {label} can reaches pots further back.",
        "The {label} capacity suits the pots near my door.",
        "The long spout reaches behind leaves.",
        "I use part of the {label} capacity for short watering trips.",
        "The handle helps me keep the can upright between pots.",
        "I chose {label} so I could carry a comfortable amount.",
        "The top opening is easy to reach when refilling."
      ],
      "limitations": [
        "It becomes heavy quickly as I add water.",
        "The spout needs room when putting it away.",
        "Filling the full {label} capacity adds weight quickly.",
        "A full can needs more care on steps."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} trowel fits between plants in my pots.",
        "Soil is easy to brush from the {label} trowel.",
        "The {label} length fits my hand and the pots I use.",
        "The pointed blade enters loose soil without a wide opening.",
        "I use the {label} tool for moving small amounts of compost.",
        "I use it to move small amounts of compost.",
        "I chose {label} for working around young plants.",
        "The blue blade is easy to spot beside the pots."
      ],
      "limitations": [
        "Compacted soil is hard work with this small tool.",
        "Sticky soil clings to the curved blade.",
        "The {label} length is less convenient in a very shallow pot.",
        "The handle needs keeping dry between uses."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} rake head gathers loose material between plants.",
        "The {label} head works with short strokes along a bed.",
        "The {label} head width fits between the plants in my bed.",
        "The long handle helps reach loose leaves near the edge.",
        "I checked plant spacing before choosing the {label} head.",
        "I use short strokes around established plants.",
        "I chose {label} after checking the gaps between plants.",
        "It is useful for gathering loose material before collecting it."
      ],
      "limitations": [
        "It is awkward in a tightly planted bed.",
        "Leaves can lodge between the tines.",
        "The {label} head width needs room to turn between plants.",
        "The handle gets in the way in a crowded shed."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The blade on the {label} shovel moves loose soil.",
        "The {label} length gives me room beside the bed.",
        "The {label} length gives me room to work beside a bed.",
        "The broad blade moves loose soil into a container.",
        "I use small loads with the {label} shovel.",
        "I use smaller loads when the soil is damp.",
        "I chose {label} for the reach I needed.",
        "The blade is straightforward to brush clean after use."
      ],
      "limitations": [
        "Wet soil makes a full load heavy.",
        "It needs more storage space than a hand tool.",
        "The {label} handle needs more storage room than a hand tool.",
        "A full load is awkward to lift over a high container."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} shears reach small stems between leaves.",
        "The {label} size is useful for routine trimming.",
        "The {label} length fits comfortably for short trimming sessions.",
        "The curved blades are easy to place around a small stem.",
        "I can hold the {label} handles for short cutting sessions.",
        "The red handles are easy to find among garden tools.",
        "I chose {label} for the size of my hand.",
        "The compact shape is easy to put away after cleaning."
      ],
      "limitations": [
        "Thick woody stems need a larger tool.",
        "Sap can leave a sticky residue on the blades.",
        "The {label} overall length does not determine the stem thickness it can cut.",
        "Repeated cuts become tiring if the stems are too thick."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The tines on the {label} fork break up small soil clumps.",
        "The {label} handle helps me work without crouching.",
        "The {label} fork fits against the wall of my shed.",
        "The four tines let loose soil fall away.",
        "I use the {label} fork along the edge of my bed.",
        "The long handle gives room for both hands.",
        "I chose {label} for the reach beside my plants.",
        "It is straightforward to knock loose soil from between the tines."
      ],
      "limitations": [
        "The handle needs more shed space than a hand tool.",
        "Roots can become caught between the tines.",
        "The {label} length needs room behind me when working.",
        "Hard ground takes more effort than loose soil."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} saucer catches drips under a pot.",
        "Standing water is visible in the {label} saucer.",
        "The {label} diameter fits beneath my pot base.",
        "The rim makes it easy to see collected water.",
        "I empty the {label} saucer after watering.",
        "The clay colour works with my plain pots.",
        "I chose {label} after measuring the base of the pot.",
        "It is easy to lift with the pot removed."
      ],
      "limitations": [
        "I needed to measure the pot base more carefully.",
        "It adds to the width needed on a narrow shelf.",
        "The {label} diameter needs matching to the pot base, not its rim.",
        "The shallow rim limits how much drainage it can hold."
      ]
    },
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
    "reviewNotes": {
      "positive": [
        "The {label} gloves keep loose compost off my hands.",
        "The {label} fit leaves my fingers free for light work.",
        "The {label} fit leaves enough room to move my fingers.",
        "I use them when handling pots and loose compost.",
        "I use the {label} pair for short potting jobs.",
        "I let them dry before putting them back with the tools.",
        "I checked the hand size before choosing {label}.",
        "They are useful for short potting jobs."
      ],
      "limitations": [
        "I would not use these for sharp thorns.",
        "Damp gloves take time to dry inside.",
        "The {label} size needs checking against my hands before a longer task.",
        "They need taking off for fiddly work with small labels."
      ]
    },
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
