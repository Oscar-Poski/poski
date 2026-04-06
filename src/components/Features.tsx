import { motion } from "framer-motion";
import {
  GlassesIcon,
  ClockIcon,
  TargetIcon,
  TriangleIcon,
  HandCoinsIcon,
  BookOpenText
} from "lucide-react";

const features = [
  {
    icon: GlassesIcon,
    title: "Aprender es Placer",
    description:
      "Creo firmemente que aprender es uno de los mayores placeres de la vida.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: HandCoinsIcon,
    title: "Privilegio de Pocos",
    description:
      "Para la mayoría, la educación representa un medio para obtener credibilidad social y, a través de ella, una recompensa económica por sus servicios.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: ClockIcon,
    title: "Aprender es un Lujo",
    description:
      "Pocos cuentan con el tiempo, la energía o la curiosidad para encontrar en el aprendizaje un camino hacia la autorrealización.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: TargetIcon,
    title: "Mi Objetivo",
    description:
      "Construir comunidades de aprendizaje donde las personas se inspiren mutuamente a buscar su mejor versión y a encontrar su lugar en el mundo.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: TriangleIcon,
    title: "Limitantes",
    description:
      "Desigualdad. Es necesario atender las necesidades primarias y, desde ahí, aspirar a las más elevadas.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: BookOpenText,
    title: "La Visión",
    description:
      "Reducir las brechas existentes y desarrollar propuestas educativas que promuevan la accesibilidad.",
    gradient: "from-yellow-500 to-orange-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
          Compartiendo mi emoción por el aprendizaje y la búsqueda de nuevos conocimientos. Este sitio mezcla mi trabajo de ingeniería con exploraciones personales, en mi intento por encontrar mi lugar en el mundo.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="group relative p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
