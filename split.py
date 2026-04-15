import os

app_file = "src/App.tsx"
with open(app_file, "r") as f:
    lines = f.readlines()

directories = ["src/types", "src/components", "src/views"]
for d in directories:
    os.makedirs(d, exist_ok=True)

# 1. Types
types_content = """export type View = "landing" | "signup" | "signin" | "mirror" | "lookbook" | "consultants" | "pricing";
"""
with open("src/types/index.ts", "w") as f:
    f.write(types_content)

# Shared imports for components
shared_imports_views = """import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Sparkles, ChevronRight, ChevronLeft, Moon, Sun, Globe, Target, Eye, EyeOff, Smartphone, BarChart3, LayoutGrid, Users, User, Mail, Lock, Scissors, ArrowRight, Heart, Box, Search, CheckCircle, Filter, Award, Star, CreditCard, Zap
} from "lucide-react";
import { View } from "../types";
"""

shared_imports_components = """import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Sparkles, ChevronRight, ChevronLeft, Moon, Sun, Globe, Target, Eye, EyeOff, Smartphone, BarChart3, LayoutGrid, Users, User, Mail, Lock, Scissors, ArrowRight, Heart, Box, Search, CheckCircle, Filter, Award, Star, CreditCard, Zap
} from "lucide-react";
"""

def write_component(filepath, lines_chunk, component_type, extra_imports=""):
    with open(filepath, "w") as f:
        if component_type == "view":
            f.write(shared_imports_views + extra_imports + "\n")
        else:
            f.write(shared_imports_components + extra_imports + "\n")
        
        # ensure export keyword is added if missing
        first_line = lines_chunk[0]
        if first_line.startswith("function "):
            lines_chunk[0] = "export default " + first_line
            
        f.writelines(lines_chunk)

# Splitting logic based on 1-indexed lines
# LandingView: 156-472
write_component("src/views/LandingView.tsx", lines[155:472], "view", 'import Footer from "../components/Footer";\n')
# SignupView: 473-652
write_component("src/views/SignupView.tsx", lines[472:652], "view")
# SigninView: 653-782
write_component("src/views/SigninView.tsx", lines[652:782], "view")
# MirrorView: 783-976
write_component("src/views/MirrorView.tsx", lines[782:976], "view")
# LookbookView: 977-1147
write_component("src/views/LookbookView.tsx", lines[976:1147], "view", 'import LookCard from "../components/LookCard";\n')
# PricingView: 1148-1323
write_component("src/views/PricingView.tsx", lines[1147:1323], "view")
# ConsultantsView: 1324-1588
write_component("src/views/ConsultantsView.tsx", lines[1323:1588], "view")
# LookCard: 1589-1639
write_component("src/components/LookCard.tsx", lines[1588:1639], "component")
# PlaceholderView: 1640-1680
write_component("src/views/PlaceholderView.tsx", lines[1639:1680], "view")
# Footer: 1681-1699
write_component("src/components/Footer.tsx", lines[1680:1699], "component")

# Rewrite App.tsx
app_imports = """/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { View } from "./types";
import LandingView from "./views/LandingView";
import SignupView from "./views/SignupView";
import SigninView from "./views/SigninView";
import MirrorView from "./views/MirrorView";
import LookbookView from "./views/LookbookView";
import PricingView from "./views/PricingView";
import ConsultantsView from "./views/ConsultantsView";
import PlaceholderView from "./views/PlaceholderView";

"""
with open("src/App.tsx", "w") as f:
    f.write(app_imports)
    f.writelines(lines[40:154]) # write the App component body
