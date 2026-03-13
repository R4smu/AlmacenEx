import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";

interface Alimento {
  categoria: string;
  [key: string]: any;
}

interface GraficoCategoriaProps {
  alimentos: Alimento[];
}

const CATEGORIAS: Record<string, { labelKey: string; color: string }> = {
  carne:      { labelKey: "carne",      color: "#FFA1AD" },
  lacteos:    { labelKey: "lacteos",    color: "#A3B3FF" },
  pescados:   { labelKey: "pescado",    color: "#B8E6FE" },
  fruta:      { labelKey: "fruta",      color: "#E9D4FF" },
  verdura:    { labelKey: "verdura",    color: "#B9F8CF" },
  panaderia:  { labelKey: "panaderia",  color: "#FFD6A7" },
  congelados: { labelKey: "congelados", color: "#DBEAFE" },
};

const CustomTooltip = ({ active, payload }: any) => {
  const { t } = useTranslation();

  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg px-4 py-2 shadow-lg text-sm">
        <p className="font-semibold text-gray-800 dark:text-white">{name}</p>
        <p className="text-gray-500 dark:text-gray-300">
          {value} {value === 1 ? t('graficoCategoria.tooltip.singular') : t('graficoCategoria.tooltip.plural')}
        </p>
      </div>
    );
  }
  return null;
};

const GraficoCategoria = ({ alimentos }: GraficoCategoriaProps) => {
  const { t } = useTranslation();

  // Contar alimentos por categoría
  const conteo = alimentos.reduce<Record<string, number>>((acc, alimento) => {
    const cat = alimento.categoria?.toLowerCase();
    if (cat) acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const datos = Object.entries(conteo)
    .filter(([cat]) => CATEGORIAS[cat])
    .map(([cat, cantidad]) => ({
      name: t(`listarProductos.categorias.${CATEGORIAS[cat].labelKey}`),
      value: cantidad,
      color: CATEGORIAS[cat].color,
    }));

  if (datos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500 gap-2">
        <span className="text-4xl">🥦</span>
        <p className="text-sm">{t('graficoCategoria.vacio')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
        {t('graficoCategoria.titulo')}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={datos}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
          >
            {datos.map((entrada, index) => (
              <Cell key={`cell-${index}`} fill={entrada.color} stroke="#00000022" strokeWidth={1} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-sm text-gray-600 dark:text-gray-300">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoCategoria;