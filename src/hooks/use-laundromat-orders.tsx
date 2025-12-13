
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type LaundromatOrderStatus = 'Intake' | 'Washing' | 'Drying' | 'Folding/QC' | 'Ready' | 'Completed' | 'Cancelled' | 'Handoff to Driver';

export interface LaundromatOrderItem {
    id: string;
    name: string;
    model: string;
    price: number;
    value: number;
}
export interface LaundromatOrder {
  id: string;
  customer: string;
  status: LaundromatOrderStatus;
  service: string;
  pickup: string;
  sla: string;
  bags?: number;
  readyTime?: string;
  driver?: string;
  rating?: number;
  reviewDate?: string;
  items?: LaundromatOrderItem[];
  isBilled?: boolean;
}


const initialOrders: LaundromatOrder[] = [
    {id: '#YL12345', customer: 'Jane Doe', status: 'Washing', service: 'Wash & Fold', pickup: 'Today, 10am', sla: 'Due in 3h', bags: 2, readyTime: 'Today, 2:15 PM', driver: 'Assigned (David L.)', rating: 5, reviewDate: 'May 13, 2024', items: [{id: 'wash-fold', name: 'Wash & Fold', model: 'per_kg', price: 1.99, value: 12}]},
    {id: '#YL12346', customer: 'John Smith', status: 'Folding/QC', service: 'Dry Cleaning', pickup: 'Today, 9am', sla: 'Due in 1h', bags: 1, readyTime: 'Today, 1:00 PM', driver: 'Unassigned', items: [{id: 'dry-cleaning', name: 'Dry Cleaning', model: 'per_item', price: 8.50, value: 5}]},
    {id: '#YL12347', customer: 'Acme Corp', status: 'Completed', service: 'Wash & Fold', pickup: 'Yesterday', sla: 'Completed', bags: 5, readyTime: 'Yesterday, 2:15 PM', driver: 'Assigned (David L.)', rating: 5, reviewDate: 'May 12, 2024'},
    {id: '#YL12348', customer: 'Peter Pan', status: 'Drying', service: 'Ironing', pickup: 'Today, 11am', sla: 'Due in 5h', bags: 3, readyTime: 'Today, 4:00 PM', driver: 'Unassigned'},
    {id: '#YL12349', customer: 'Mary Poppins', status: 'Intake', service: 'Wash & Fold', pickup: 'Today, 1pm', sla: 'Due in 24h', bags: 2, readyTime: 'Tomorrow, 1:00 PM', driver: 'Unassigned'},
    {id: '#YL12350', customer: 'Wonderland Inc.', status: 'Handoff to Driver', service: 'Bedding', bags: 12, readyTime: 'Today, 3:00 PM', pickup: 'Today, 10am', sla: 'Completed'},
    {id: '#YL12351', customer: 'Walk-in Customer', service: 'Wash & Fold', bags: 2, readyTime: 'Today, 3:30 PM', status: 'Completed', pickup: 'Today, 11am', sla: 'Completed', rating: 4, reviewDate: 'May 13, 2024'},
];

interface LaundromatOrdersContextType {
  orders: LaundromatOrder[];
  updateOrderStatus: (orderId: string, newStatus: LaundromatOrderStatus) => void;
  getOrderById: (orderId: string) => LaundromatOrder | undefined;
  addOrder: (order: LaundromatOrder) => void;
  updateOrder: (order: Partial<LaundromatOrder> & Pick<LaundromatOrder, 'id'>) => void;
}

const LaundromatOrdersContext = createContext<LaundromatOrdersContextType | undefined>(undefined);

export const LaundromatOrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<LaundromatOrder[]>(initialOrders);

  const updateOrderStatus = useCallback((orderId: string, newStatus: LaundromatOrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  }, []);

  const getOrderById = useCallback((orderId: string) => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  const addOrder = useCallback((order: LaundromatOrder) => {
    setOrders(prevOrders => [order, ...prevOrders]);
  }, []);

  const updateOrder = useCallback((updatedOrder: Partial<LaundromatOrder> & Pick<LaundromatOrder, 'id'>) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order
      )
    );
  }, []);


  return (
    <LaundromatOrdersContext.Provider value={{ orders, updateOrderStatus, getOrderById, addOrder, updateOrder }}>
      {children}
    </LaundromatOrdersContext.Provider>
  );
};

export const useLaundromatOrders = () => {
  const context = useContext(LaundromatOrdersContext);
  if (context === undefined) {
    throw new Error('useLaundromatOrders must be used within a LaundromatOrdersProvider');
  }
  return context;
};
