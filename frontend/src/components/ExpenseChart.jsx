import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';

const ExpenseChart = () => {
    const { transactions } = useSelector((state) => state.transaction); 

    // Data preparation
    const expenseData = transactions
        .filter(t => t.transactionType === 'expense')
        .reduce((acc, curr) => {
            const found = acc.find(item => item.name === curr.transactionCategory);
            if (found) {
                found.value += curr.amount;
            } else {
                acc.push({ name: curr.transactionCategory, value: curr.amount });
            }
            return acc;
        }, []);

    // Agar data khali hai, toh skeleton/placeholder data create karein
    const isEmpty = expenseData.length === 0;
    const placeholderData = [{ name: 'No Data', value: 1 }];

    const COLORS = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];
    // Skeleton ke liye light gray color
    const EMPTY_COLOR = ['#334155']; 

    return (
        <div className="w-full h-112.5 bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col relative">
            <h3 className="text-lg font-bold text-white mb-4 tracking-tight">Expense Breakdown</h3>
            
            <div className="grow w-full h-full relative">
                {/* Center Text for Empty State */}
                {isEmpty && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 pb-12">
                        <span className="text-slate-500 text-sm font-medium">No expenses yet</span>
                        <span className="text-slate-600 text-[10px] uppercase tracking-widest mt-1">Add data to see chart</span>
                    </div>
                )}

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={isEmpty ? placeholderData : expenseData}
                            cx="50%"
                            cy="42%"
                            innerRadius={70}
                            outerRadius={95}
                            paddingAngle={isEmpty ? 0 : 5}
                            dataKey="value"
                            stroke="none"
                            // Animation disable kar dete hain skeleton ke liye
                            isAnimationActive={!isEmpty}
                        >
                            {isEmpty ? (
                                <Cell fill={EMPTY_COLOR[0]} opacity={0.5} />
                            ) : (
                                expenseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            )}
                        </Pie>
                        
                        {/* Tooltip sirf tab dikhao jab data ho */}
                        {!isEmpty && (
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155', 
                                    borderRadius: '12px', 
                                    color: '#fff' 
                                }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                            />
                        )}
                        
                        {/* Legend bhi sirf data hone par dikhao */}
                        {!isEmpty && (
                            <Legend 
                                verticalAlign="bottom" 
                                align="center"
                                iconType="circle"
                                iconSize={10}
                                wrapperStyle={{ 
                                    paddingTop: '20px',
                                    fontSize: '12px',
                                    color: '#94a3b8'
                                }}
                            />
                        )}
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpenseChart;