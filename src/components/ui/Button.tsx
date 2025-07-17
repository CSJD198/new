@@ .. @@
 interface ButtonProps {
   children: React.ReactNode;
   variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
   size?: 'sm' | 'md' | 'lg';
   loading?: boolean;
   disabled?: boolean;
   onClick?: () => void;
   className?: string;
   type?: 'button' | 'submit' | 'reset';
+  as?: 'button' | 'span';
 }
 
 export const Button: React.FC<ButtonProps> = ({
@@ .. @@
   onClick,
   className = '',
   type = 'button',
+  as = 'button',
 }) => {
   const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
@@ .. @@
 
   const isDisabled = disabled || loading;

-  return (
+  const Component = as;
+  
+  return (
-    <motion.button
+    <motion.div
+      as={Component}
       whileHover={!isDisabled ? { scale: 1.02 } : {}}
       whileTap={!isDisabled ? { scale: 0.98 } : {}}
-      type={type}
-      onClick={onClick}
-      disabled={isDisabled}
+      {...(as === 'button' ? { type, onClick, disabled: isDisabled } : { onClick })}
       className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
     >
       {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
       {children}
-    </motion.button>
+    </motion.div>
   );
 };